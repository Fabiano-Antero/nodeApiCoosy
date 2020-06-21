const express = require('express')
const auth = require('../middleware/auth')
const comment = require('../controllers/controllerComment')

const router = express.Router()



//Rotas post
router.post('/api/post/comentarios/:id', auth, comment.create ),
router.delete('/api/post/delete/comentarios/:id', auth, comment.delete),
router.get('/api/post/buscar/comentario/:id', auth, comment.search), // coemntário
router.get('/api/post/buscar/comentarios', auth, comment.searchs)//comentários
router.put('/api/post/update/comentario/:id', auth, comment.update)




module.exports = router