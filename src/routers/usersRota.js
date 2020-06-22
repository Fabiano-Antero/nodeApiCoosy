const express = require('express')
const auth = require('../middleware/auth')
const Users = require('../controllers/controllersUsers')
const router = express.Router()


//Todas do usuário
router.post('/api/registrar', Users.registra) // criar a conta
router.post('/api/login', Users.login) // faz o login e autentica
router.post('/api/logout',auth, auth, Users.logout) //desloga de alguna
router.post('/api/logoutall',auth, auth, Users.logoutAll) //desloga geral
router.get('/api/me',auth, Users.dadosPerfil)// exibe dados de um registro
router.get('/api/registro/all',auth, Users.pesquisaTodos)// busca todos registros
router.get('/api/registro/:id',auth, Users.pesquisaUm)// busca um registro especifico
router.delete('/api/registro/:id',auth, Users.delete)// deleta um registro
router.put('/api/update/:id', auth, Users.update)



module.exports = router