import express from 'express'
import cursoRoutes from './app/routes/CursoRoutes.js';

const app = express()

app.use(express.json())

// ROTAS
app.use(cursoRoutes)

// Criando um endpoint que lista os cursos
//app.get('/cursos', (req, res) => {
  //conexao.query('SELECT * FROM cursos', (e, r) =>
    //e ? res.status(500).json(e) : res.json(r)
  //)
//})

// Inserir novo curso. Pega disciplina do req.body, executa o insert. Se erro, 500. Se sucesso, retorna o resultado r.
//app.post('/cursos', (req, res) => {
  //conexao.query('INSERT INTO cursos (disciplinas) VALUES (?)', 
    //[req.body.disciplinas], (e, r) => e ? res.status(500).json(e) : res.json({ id: r.insertId, ...req.body }))
//})

// Função buscando um item por id. Se erro, 500. Se sucesso, retorna o resultado r.
//app.get('/cursos/:id', (req, res) => {
  //conexao.query('SELECT * FROM cursos WHERE id = ?', 
    //[req.params.id], (e, r) => e ? res.status(500).json(e) : res.json(r))
//})

// Alterar a disciplina por um ID - req.params pega o id do curso, pega disciplina de req.body, executa o UPDATE. Se erro, 500. Caso sucesso retorna o id e disciplina atualizados.
//app.put('/cursos/:id', (req, res) => { conexao.query('UPDATE cursos SET disciplinas = ? WHERE id = ?', 
  //[req.body.disciplinas, req.params.id], (e, r) => e ? res.status(500).json(e) : res.json({ id: req.params.id, ...req.body })) 
//})

// Excluir o curso pelo id - req.params para pegar o id, executa o delete. Se erro, 500. Se sucesso, true
//app.delete('/cursos/:id', (req, res) => {
  //conexao.query('DELETE FROM cursos WHERE id = ?', [req.params.id], 
    //(e, r) => e ? res.status(500).json(e) : res.json({ sucesso: true }))
//})

export default app
