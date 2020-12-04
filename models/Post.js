const mongoose = require('mongoose') 

const postSchema = new mongoose.Schema({
    userId : {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    
    criadoEm: {
        type: Date,
        required: true,
        default: Date.now
    },
    atualizadoEm: {
        type: Date,
        required: true,
        default: Date.now
    }
})


module.exports = mongoose.model('post', postSchema)
