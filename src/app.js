const express = require('express')
const port = process.env.PORT
const userRouter = require('./routers/user')
require('./db/db')

const app = express()

app.use(express.json())
app.use(userRouter)

app.get('/', (req, res) => {
    res.json({
        message: "Bem vindo ao Coosy  socail aplication. "});
});

app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`)
})