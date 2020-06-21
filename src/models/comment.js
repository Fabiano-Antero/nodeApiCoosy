const mongoose = require( 'mongoose')

const comentSchema = mongoose.Schema({
    post_id: { type: mongoose.Schema.ObjectId, ref: 'Post'},
    comentario:[
        {
            autor_id:{type: String, required: true},
            nome: { type: String, required: true},
            conteudo: { type: String, required: true },
            data: { type : Date, default: Date.now }
        }
    ]
})

const comment = mongoose.model('comentario', comentSchema)

module.exports = comment