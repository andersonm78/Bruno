import express from 'express';
import conexao from '../infra/conexao.js';
const app = express();

// indicar para o express ler o body como json
app.use(express.json());

// const cursos = [
//     { id: 1, disciplina: 'ADS' },
//     { id: 2, disciplina: 'ADS' },
//     { id: 3, disciplina: 'ADS' },
//     { id: 4, disciplina: 'ADS' },
//     { id: 5, disciplina: 'ADS' }
// ];

// function buscarCursosPorId(id) {
//     return cursos.filter(curso => curso.id == id);
// }

// function buscarIndexCurso(id) {
//     return cursos.findIndex(curso => curso.id == id);
// }

// Criando uma rota default (endpoint)
// app.get('/', (req, res) => {
//     res.send('Hello Anderson');
// });


// ROTAS
app.get('/cursos', (req, res) => {
    // res.status(200).send(cursos);
    const sql = "SELECT * FROM cursos;";
    conexao.query(sql, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).json(result);
        }
    });
});


// ============================================================================
// ROTA: CRIAR UM NOVO CURSO (CREATE)
// ============================================================================
app.post('/cursos', (req, res) => {
    const { disciplina } = req.body; // Extrai o campo "disciplina" do corpo da requisição

    if (!disciplina) { // Validação: campo obrigatório
        return res.status(400).json({ erro: "Campo 'disciplina' é obrigatório" });
    }

    // SQL com placeholder (?) para evitar SQL Injection
    const sql = "INSERT INTO cursos (disciplina) VALUES (?)";
    conexao.query(sql, [disciplina], (error, result) => {
        if (error) {
            console.error("Erro ao inserir curso:", error);
            res.status(500).json({ erro: "Erro ao cadastrar curso" });
        } else {
            // Retorna 201 (Created) com o novo curso
            res.status(201).json({ id: result.insertId, disciplina });
        }
    });
});

// ============================================================================
// ROTA: LISTAR UM CURSO PELO ID (READ BY ID)
// ============================================================================
app.get('/cursos/:id', (req, res) => {
    const { id } = req.params; // Pega o ID da URL

    const sql = "SELECT * FROM cursos WHERE id = ?";
    conexao.query(sql, [id], (error, results) => {
        if (error) {
            console.error("Erro ao buscar curso:", error);
            res.status(500).json({ erro: "Erro ao consultar curso" });
        } else if (results.length === 0) {
            // Caso o ID não exista
            res.status(404).json({ msg: "Curso não encontrado" });
        } else {
            res.status(200).json(results[0]); // Retorna o curso encontrado
        }
    });
});

// ============================================================================
// ROTA: ATUALIZAR UM CURSO (UPDATE)
// ============================================================================
app.put('/cursos/:id', (req, res) => {
    const { id } = req.params;            // ID que vem da URL
    const { disciplina } = req.body;      // Novo valor da disciplina

    if (!disciplina) {
        return res.status(400).json({ erro: "Campo 'disciplina' é obrigatório" });
    }

    const sql = "UPDATE cursos SET disciplina = ? WHERE id = ?";
    conexao.query(sql, [disciplina, id], (error, result) => {
        if (error) {
            console.error("Erro ao atualizar curso:", error);
            res.status(500).json({ erro: "Erro ao atualizar curso" });
        } else if (result.affectedRows === 0) {
            // Nenhuma linha foi alterada → ID não existe
            res.status(404).json({ msg: "Curso não encontrado" });
        } else {
            res.status(200).json({ id, disciplina }); // Retorna o curso atualizado
        }
    });
});

// ============================================================================
// ROTA: DELETAR UM CURSO (DELETE)
// ============================================================================
app.delete('/cursos/:id', (req, res) => {
    const { id } = req.params; // ID que vem da URL

    const sql = "DELETE FROM cursos WHERE id = ?";
    conexao.query(sql, [id], (error, result) => {
        if (error) {
            console.error("Erro ao excluir curso:", error);
            res.status(500).json({ erro: "Erro ao excluir curso" });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ msg: "Curso não encontrado" });
        } else {
            res.status(200).json({ msg: `Curso ${id} excluído com sucesso!` });
        }
    });
})


app.post('/cursos', (req, res) => {
    cursos.push(req.body);
    res.status(200).send('Seleção cadastrada com sucesso!');
});

app.get('/cursos/:id', (req, res) => {
    // let index = req.params.id;
    // console.log(index);
    res.json(buscarCursosPorId(req.params.id));
});

// app.delete('/cursos/:id', (req, res) => {
//     let index = buscarIndexCurso(req.params.id);
//     console.log(index);
// });

app.delete('/cursos/:id', (req, res) => {
    let index = buscarIndexCurso(req.params.id);
    cursos.splice(index, 1);
    console.log(index);
    res.send(`O curso com id ${req.params.id} excluído com sucesso!`);
});

app.put('/cursos/:id', (req, res) => {
    let index = buscarIndexCurso(req.params.id);
    cursos[index].disciplina = req.body.disciplina;
    res.json(cursos);
});

export default app;