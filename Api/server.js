const express = require('express');
const cors = require('cors');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const app = express();
const PORT = 4000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const authRoutes = require('./auth/validation');
app.use('/api/auth', authRoutes);

// Servir imagens estáticas
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// Criar um novo jogo
app.post('/games', async (req, res) => {
    const {
        title,
        description,
        image,
        price,
        originalPrice,
        rating,
        platforms,
        genres,
        releaseDate,
        developer,
        publisher,
        tags,
    } = req.body;

    if (!title || !description || !image || price == null) {
        return res.status(400).json({ error: 'Campos obrigatórios ausentes: title, description, image e price' });
    }

    // Calcula o desconto com base no preço e preço original
    const discount = (originalPrice && price && originalPrice > price)
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;

    try {
        const newGame = await prisma.game.create({
            data: {
                title,
                description,
                image,
                price,
                originalPrice,
                discount,
                rating,
                platforms,
                genres,
                releaseDate: releaseDate ? new Date(releaseDate) : undefined,
                developer,
                publisher,
                tags,
            },
        });

        res.status(201).json(newGame);
    } catch (error) {
        console.error('Erro ao criar jogo:', error);
        res.status(500).json({ error: 'Erro ao criar o jogo', details: error.message });
    }
});


// Buscar todos os jogos
app.get('/games', async (req, res) => {
    try {
        const games = await prisma.game.findMany();
        res.json(games);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar jogos' });
    }
});

app.get('/games', async (req, res) => {
    try {
        const { genres, platform, minPrice, maxPrice, discount } = req.query;

        const filters = {};

        // Filtro por gêneros (array ou string com vírgula)
        if (genres) {
            const genresArray = Array.isArray(genres) ? genres : genres.split(',');
            filters.genres = { hasSome: genresArray };
        }

        // Filtro por plataformas (array ou string com vírgula)
        if (platform) {
            const platformsArray = Array.isArray(platform) ? platform : platform.split(',');
            filters.platforms = { hasSome: platformsArray };
        }

        // Filtro por faixa de preço
        if (minPrice || maxPrice) {
            filters.price = {};
            if (minPrice) filters.price.gte = Number(minPrice);
            if (maxPrice) filters.price.lte = Number(maxPrice);
        }

        // Filtro por desconto mínimo (ex: desconto=1 filtra todos que tenham algum desconto)
        if (discount) {
            filters.discount = { gte: Number(discount) };
        }

        const games = await prisma.game.findMany({
            where: filters,
        });

        res.json(games);
    } catch (error) {
        console.error('Erro ao buscar jogos com filtros:', error);
        res.status(500).json({ error: 'Erro ao buscar jogos com filtros' });
    }
});

// Atualizar um jogo pelo ID
app.put('/games/:id', async (req, res) => {
    const { id } = req.params;

    const {
        title,
        description,
        image,
        price,
        originalPrice,
        discount,
        rating,
        platforms,
        genres,
        releaseDate,
        developer,
        publisher,
        tags
    } = req.body;

    if (!title || !description || !image) {
        return res.status(400).json({ error: 'Campos obrigatórios ausentes: title, description e image' });
    }

    try {
        const updatedGame = await prisma.game.update({
            where: { id },
            data: {
                title,
                description,
                image,
                price,
                originalPrice,
                discount,
                rating,
                platforms,
                genres,
                releaseDate: releaseDate ? new Date(releaseDate) : undefined,
                developer,
                publisher,
                tags
            }
        });

        res.json(updatedGame);
    } catch (error) {
        console.error('Erro ao atualizar jogo:', error);
        res.status(500).json({ error: 'Erro ao atualizar o jogo', details: error.message });
    }
});

// Deletar um jogo pelo ID
app.delete('/games/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.game.delete({
            where: { id }
        });
        res.json({ message: 'Jogo removido com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar o jogo' });
    }
});

// Criar nova quest
app.post('/quests', async (req, res) => {
    const { title, description, points, progress = 0, totalSteps = 1, iconName = "heart" } = req.body;

    if (!title || !description || points == null) {
        return res.status(400).json({ error: 'Campos obrigatórios ausentes: title, description e points' });
    }

    try {
        const newQuest = await prisma.quest.create({
            data: {
                title,
                description,
                points,
                progress,
                totalSteps,
                iconName,
            },
        });
        res.status(201).json(newQuest);
    } catch (error) {
        console.error('Erro ao criar quest:', error);
        res.status(500).json({ error: 'Erro ao criar a quest', details: error.message });
    }
});

// Listar todas as quests
app.get('/quests', async (req, res) => {
    try {
        const quests = await prisma.quest.findMany();
        res.json(quests);
    } catch (error) {
        console.error('Erro ao buscar quests:', error);
        res.status(500).json({ error: 'Erro ao buscar quests' });
    }
});

// Atualizar uma quest pelo ID
app.put('/quests/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, points } = req.body;

    if (!title || !description || points == null) {
        return res.status(400).json({ error: 'Campos obrigatórios ausentes: title, description e points' });
    }

    try {
        const updatedQuest = await prisma.quest.update({
            where: { id },
            data: { title, description, points },
        });
        res.json(updatedQuest);
    } catch (error) {
        console.error('Erro ao atualizar quest:', error);
        res.status(500).json({ error: 'Erro ao atualizar a quest', details: error.message });
    }
});

// Deletar uma quest pelo ID
app.delete('/quests/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.quest.delete({
            where: { id }
        });
        res.json({ message: 'Quest removida com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar quest:', error);
        res.status(500).json({ error: 'Erro ao deletar a quest' });
    }
});

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});
