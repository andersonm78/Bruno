import conexao from '../database/conexao.js';

class CursoRepository {
    async findAll() {
        const [result] = await conexao.query("SELECT * FROM curso;")
        return result
    }

    async findById(id) {
        const [result] = await conexao.query("SELECT * FROM curso WHERE id = ?", [id])
        return result[0] || null; // retorna 1 curso ou null
    }

    async create({ id, disciplina }) {
        await conexao.query("INSERT INTO curso (id, disciplina) VALUES (?, ?)", [id, disciplina])
        return { id, disciplina }
    }

    async update(id, disciplina) {
        const [result] = await conexao.query("UPDATE curso SET disciplina = ? WHERE id = ?", [disciplina, id])
        return result
    }

    async delete(id) {
        const [result] = await conexao.query("DELETE FROM curso WHERE id = ?", [id])
        return result
    }
}

export default new CursoRepository()
