const express = require('express')
const port = process.env.PORT
const userRouter = require('./routers/user')
require('./db/db')

const app = express()

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`)
})