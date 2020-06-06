
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => console.log('Banco de dados conectado!'))
    .catch(err => {
        console.log("Erro na conexão com o banco de dados: ", err.message);
        process.exit(1);
    });
mongoose.set('useCreateIndex', true);
