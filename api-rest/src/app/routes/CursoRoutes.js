import { Router } from 'express'
import CursoController from '../controllers/CursoController.js'

const router = Router()

// Rotas ligadas ao controller
router.get('/cursos', (req, res) => CursoController.index(req, res));

export default router