const mongoose = require('mongoose')


const postSchema = mongoose.Schema({
    
    autor_id : {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    data: { type : Date, default: Date.now },
    like: { type: Number, trim: true, required: true },
    conteudo: { type: String, required: true },
    images: { type: Object, required: true },
    comentarios_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'comentario',}]

})

const post = mongoose.model('Post', postSchema)

module.exports = post