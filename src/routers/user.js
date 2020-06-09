const express = require('express')
const auth = require('../middleware/auth')
const controllersUsers = require('../controllers/controllersUsers')

const router = express.Router()


//todas do usuário
router.post('/api/registrar', controllersUsers.registra) // criar a conta
router.post('/api/login', controllersUsers.login) // faz o login e autentica
router.post('/api/logout', auth, controllersUsers.logout) //desloga de alguna
router.post('/api/logoutall', auth, controllersUsers.logoutAll) //desloga geral
router.get('/api/me',auth, controllersUsers.dadosPerfil)// exibe dados de um registro
router.get('/api/registro/all', controllersUsers.pesquisaTodos)// busca todos registros
router.get('/api/registro/:id', controllersUsers.pesquisaUm)// busca um registro especifico
router.delete('/api/registro/:id', controllersUsers.delete)// deleta um registro



module.exports = router