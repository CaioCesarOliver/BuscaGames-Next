const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// Rota para login
router.post('/login', async (req, res) => {
    const { emailOuUsuario, senha } = req.body;

    if (!emailOuUsuario || !senha) {
        return res.status(400).json({ error: 'Email/Usuário e senha são obrigatórios' });
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: emailOuUsuario },
                    { username: emailOuUsuario }
                ]
            }
        });

        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        const senhaValida = await bcrypt.compare(senha, user.password);

        if (!senhaValida) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        res.json({
            message: 'Login efetuado com sucesso',
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

// Rota para registro de usuário
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
    }

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        });

        if (existingUser) {
            return res.status(409).json({ error: 'Usuário ou email já cadastrado' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        res.status(201).json({
            message: 'Usuário criado com sucesso',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Erro no cadastro:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

module.exports = router;
