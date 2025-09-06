import CursoRepository from '../repositories/CursoRepository.js'

class CursoController {
    // lista todos os cursos
    async index(req, res) { // async permite usar await dentro da função.
        try {
            const cursos = await CursoRepository.findAll()
            res.status(200).json(cursos)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params
            const curso = await CursoRepository.findById(id)

            if (!curso) {
                return res.status(404).json({ mensagem: "Curso não encontrado" })
            }
            res.status(200).json(curso)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async store(req, res) {
        try {
            const { id, disciplina } = req.body
            const curso = await CursoRepository.create({ id, disciplina })
            res.status(201).json(curso)
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ mensagem: "Já existe um curso com esse ID" })
            }
            res.status(500).json({ error: error.message })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const { disciplina } = req.body
            const result = await CursoRepository.update(id, disciplina)

            if (result.affectedRows === 0) {
                return res.status(404).json({ mensagem: "Curso não encontrado" })
            }
            res.status(200).json({ mensagem: "Curso atualizado com sucesso", id, disciplina })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            const result = await CursoRepository.delete(id)

            if (result.affectedRows === 0) {
                return res.status(404).json({ mensagem: "Curso não encontrado" })
            }
            res.status(200).json({ mensagem: `Curso com id ${id} deletado com sucesso` })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

export default new CursoController()
