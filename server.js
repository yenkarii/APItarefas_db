import express from 'express'
import dotenv from 'dotenv';
import conectarBanco from './db.js';

dotenv.config();

const app = express ();

app.use (express.json());

app.use(express.static('./public'));

const PORT = process.env.PORT;

const conn = conectarBanco();

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: './public'});
});

// rota para listar todas as tarefas
app.get('/tarefas', async (req, res) => {
    const sql = 'SELECT * FROM tarefas'
    const [resp] = await conn.query(sql);
    res.status(200).json(resp);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})