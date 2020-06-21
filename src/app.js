const express = require('express')
const port = process.env.PORT
const userRouter = require('./routers/usersRota')
const userPost = require('./routers/postsRota')
const userComment = require('./routers/commentsRota')
require('./db/db')

const app = express()


app.use(express.json())
app.use(userRouter, userPost, userComment)

app.get('/', (req, res) => {
    res.json({
        message: "Bem vindo ao Coosy  socail aplication. "
    });
});
app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`)
})