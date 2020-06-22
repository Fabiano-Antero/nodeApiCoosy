const express = require('express')
const auth = require('../middleware/auth')
const uploads = require('../middleware/storage')

const postagem = require('../controllers/controllerPost')
const post = require('../models/post')

const router = express.Router()



//Rotas post
router.post('/api/post/img/:id', auth, uploads, postagem.create),
router.delete('/api/post/img/delete/:id', auth, postagem.delete),
router.put('/api/post/img/update/:id', auth, postagem.update),
router.get('/api/post/img/buscar', auth, postagem.searchs),//busca todos
router.get('/api/post/img/buscas/:id', auth, postagem.search)//busca um

module.exports = router