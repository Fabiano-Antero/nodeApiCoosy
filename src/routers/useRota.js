const express = require('express')
const auth = require('../middleware/auth')
const uploads = require('../middleware/storage')

const controllersUsers = require('../controllers/controllersUsers')
const controllerPost = require('../controllers/controllerPost')

const router = express.Router()


//Todas do usuário
router.post('/api/registrar', controllersUsers.registra) // criar a conta
router.post('/api/login', controllersUsers.login) // faz o login e autentica
router.post('/api/logout', auth, controllersUsers.logout) //desloga de alguna
router.post('/api/logoutall', auth, controllersUsers.logoutAll) //desloga geral
router.get('/api/me',auth, controllersUsers.dadosPerfil)// exibe dados de um registro
router.get('/api/registro/all', controllersUsers.pesquisaTodos)// busca todos registros
router.get('/api/registro/:id', controllersUsers.pesquisaUm)// busca um registro especifico
router.delete('/api/registro/:id', controllersUsers.delete)// deleta um registro

//Rotas post
router.post('/api/post/img/:id', auth, uploads, controllerPost.imgUploads)



module.exports = router