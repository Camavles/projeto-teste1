const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    nome: {
        type: String, 
        required: true
    },
    telefone: {
        type: String, 
        required: true
    },
    endereco: {
        type: String, 
        required: true
    },
    plano_saude: {
        type: String, 
        required: false
    },
    plano_saude_numero: {
        type: Number, 
        required: false
    }
}, { timestamps : true })

module.exports = mongoose.model("paciente", pacienteSchema)