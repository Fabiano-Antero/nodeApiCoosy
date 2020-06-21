const express = require('express')
const auth = require('../middleware/auth')
const uploads = require('../middleware/storage')

const postagem = require('../controllers/controllerPost')
const post = require('../models/post')

const router = express.Router()



//Rotas post
router.post('/api/post/img/:id', auth, uploads, postagem.create),
router.delete('/api/post/img/delete/:id', auth,  postagem.delete),



module.exports = router