import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// GET quests com dados formatados para front
app.get('/quests', async (req, res) => {
    const raw = await prisma.quest.findMany();
    const quests = raw.map(q => ({
        id: q.id,
        title: q.title,
        description: q.description,
        points: q.points,
        progress: q.progress,
        total: q.totalSteps,
        status: q.progress >= q.totalSteps ? 'complete' : 'in_progress',
        iconName: q.iconName
    }));
    res.json(quests);
});

// POST quest com retorno formatado
app.post('/quests', async (req, res) => {
    const { title, description, points, progress, totalSteps, iconName } = req.body;

    if (
        !title ||
        !description ||
        points == null ||
        progress == null ||
        totalSteps == null ||
        !iconName
    ) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const newQuest = await prisma.quest.create({
            data: { title, description, points, progress, totalSteps, iconName }
        });
        return res.status(201).json(newQuest);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao criar quest.' });
    }
});
app.listen(4000, () => {
    console.log('Servidor backend rodando na porta 4000');
});
