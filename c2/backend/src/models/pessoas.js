//----------------------------------------------------------------------------//
// Configuração do Schema a ser utilizado na Collection "Pessoas", no banco   //
// de dados "web2", configurado no MongoDB. Utilizaremos o Mongoose para      //
// realizar o ODM (Object Data Modelling).                                    //
//----------------------------------------------------------------------------//

// Import do Mongoose:
const mongoose = require('mongoose');

// Definição do Schema para a Collection "Pessoas":
const pessoasSchema = mongoose.Schema({
    nome_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    cpf_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    data_nascimento_pessoa: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    unidade_id: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    grupo_prioritario_pessoa: {
        type: mongoose.Schema.Types.Boolean,
        required: false,
        default: false
    },
    endereco_pessoa: {
        type: mongoose.Schema.Types.String,
        required: false,
        default: null
    },
    telefone_pessoa: {
        type: mongoose.Schema.Types.String,
        required: false,
        default: null
    },
    email_pessoa: {
        type: mongoose.Schema.Types.String,
        required: false,
        default: null
    },
    data_criacao_pessoa: {
        type: mongoose.Schema.Types.Date,
        required: true,
        default: Date.now
    },
    data_alteracao_pessoa: {
        type: mongoose.Schema.Types.Date,
        required:false,
        default: null
    }
});




//----------------------------------------------------------------------------//
// Publica o Schema para que possa ser utilizado na aplicação.                //
//----------------------------------------------------------------------------//

// Exporta o Schema da Collection "Pessoas":
module.exports = mongoose.model('pessoas', pessoasSchema);