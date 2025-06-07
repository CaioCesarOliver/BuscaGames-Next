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
