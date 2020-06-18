const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, '*Campo obrigatório!'],
        trim: true
    },
    idade: {
        type: Number,
        required: [true, '*Campo obrigatório!'],
        min: 12, 
        max: 150,
        trim: true
    },
    sexo: {
        type: String,
        trim: true
    },
    pais: {
        type: String,
        trim: true
    },
    estado: {
        type: String,
        trim: true
    },
    cidade: {
        type: String,
        trim: true
    },
    telefone: {
        type: Number,
        required: [true, '*Campo obrigatório!'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, '*Campo obrigatório!'],
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'E-mail invalido!'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    status:[
        {
            ativo: {
                type: Number,
                trim: true
            },
            online: {
                type: Number,
                trim: true
            },
            banido: [
                {
                    valor: {
                        type: Number,
                        trim: true
                    },
                    data: {
                        type: String,
                        trim: true
                    },
                    motivo: {
                        type: String,
                        trim: true
                    }
                }
            ] 
        }
    ],
    primeiroAcesso:{
        type: Number,
        trim: true
    },
    nivelAcesso: {
        type: Number,
        trim: true
    },
    posts : [
        {type: mongoose.Schema.Types.ObjectId,ref:'Post'}
    ]
})

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    //Pusca usuário por e-mail senha e telefone
    const user = await User.findOne({ email } )
    if (!user) {
        throw new Error({ error: 'Log-in invalido' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Senha invalida' })
    }
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User