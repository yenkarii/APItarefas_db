import express from 'express'
import dotenv from 'dotenv';
import conectarBanco from './db.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.static('./public'));

const PORT = process.env.PORT;

const conn = conectarBanco();

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './public' });
});

// rota para listar todas as tarefas
app.get('/tarefas', async (req, res) => {
    const sql = 'SELECT * FROM tarefas'
    try {
        const [resp] = await conn.query(sql);
            res.status(200).json(resp);
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({erro: "Erro interno ao listar tarefas!"});
    }
});

// rota para listar tarefa específica por ID
app.get('/tarefas/:id', async (req, res) => {
    const id = Number(req.params.id);
    const sql = 'SELECT * FROM tarefas WHERE id = ?';
    try {
        const [resp] = await conn.query(sql, [id])
        if (resp.length === 0) {
            return res.status(404).json({ erro: "Tarefa não encontrada ou inexistente!" });
        }
        res.status(200).json(resp[0]);
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: "Erro interno ao tentar listar artista específico!" })
    }
});

// rota para cadastrar novas tarefas
app.post('/tarefas', async (req, res) => {
    const { nome, descricao, responsavel } = req.body;
    if(!nome || !descricao || !responsavel){
        return res.status(400).json({erro: "Informe nome, descrição e responsável pela tarefa!"});
    }
    const sql = 'INSERT INTO tarefas(nome, descricao, responsavel, data_tarefa, concluido) VALUES (?, ?, ?, CURRENT_DATE, FALSE)';
    try {
        const [resp] = await conn.query(sql, [nome, descricao, responsavel]);
        res.status(201).json({mensagem: "Tarefa cadastrada com sucesso!",
            id: resp.insertId
        });
        
    } catch(erro) {
        console.error(erro);
        return res.status(500).json({erro: "Erro interno ao tentar cadastrar tarefa!"});
    }
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})