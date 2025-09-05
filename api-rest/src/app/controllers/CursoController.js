// index(): listar tudo
// show(): listar por ai
// store(): criar dados
// update(): atualizar dados
// delete(): remover dados
import conexao from '../database/conexao.js';

class CursoController {
    index(req, res) {
        const sql = "SELECT * FROM cursos;";
        conexao.query(sql, (error, result) => {
            if (error) {
                console.log(error);
                res.status(404).json({ 'error': error })
            } else {
                res.status(200).json(result);
            }
        })
    }
    show(req, res) {
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
    }
    store(req, res) {
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
    }
    update(req, res) {
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
    }
    delete(req, res) {
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
    }
}
export default new CursoController();