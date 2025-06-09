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
        // Recebe filtros via query params
        const { genres, platform, minPrice, maxPrice, discount } = req.query;

        // Monta o filtro dinamicamente
        const filters = {};

        // Filtro por gêneros (array ou string separados por vírgula)
        if (genres) {
            const genresArray = Array.isArray(genres) ? genres : genres.split(',');
            filters.genres = {
                hasSome: genresArray,
            };
        }

        // Filtro por plataformas (array ou string separados por vírgula)
        if (platform) {
            const platformsArray = Array.isArray(platform) ? platform : platform.split(',');
            filters.platforms = {
                hasSome: platformsArray,
            };
        }

        // Filtro por faixa de preço
        if (minPrice || maxPrice) {
            filters.price = {};
            if (minPrice) filters.price.gte = Number(minPrice);
            if (maxPrice) filters.price.lte = Number(maxPrice);
        }

        // Filtro por desconto mínimo
        if (discount) {
            filters.discount = {
                gte: Number(discount),
            };
        }

        // Busca jogos com filtros aplicados
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

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});
