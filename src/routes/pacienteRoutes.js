const controller = require('../controllers/pacienteController')
const express = require('express')

const router = express.Router()

const { checkAuth } = require('../middlewares/auth')

router.get('/all', controller.buscarPaciente)

router.post('/create', controller.criarPaciente)
router.patch('/update/:id', controller.atualizarPaciente)
router.delete('/delete/:id', controller.deletarPaciente)
router.get('/:id', controller.buscarPacientePorId)

module.exports = router