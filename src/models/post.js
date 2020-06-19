const mongoose = require('mongoose')


const postSchema = mongoose.Schema({
    /*
    comentario: [
        {
            type: Schema.Types.ObjectId,
            ref: autor,
            required: true
            
        }
    ],*/
      autor : [
        {type: mongoose.Schema.Types.ObjectId,ref:'User'}
    ],
    data: { type: Date, default: Date.now() },
    like: { type: Number, trim: true, required: true },
    conteudo: { type: String, required: true },
    images: { type: Object, required: true }

})

const post = mongoose.model('Post', postSchema)

module.exports = post