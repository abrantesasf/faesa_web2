//----------------------------------------------------------------------------//
// Configuração do Schema a ser utilizado na Collection "Unidades", no banco  //
// de dados "web2", configurado no MongoDB. Utilizaremos o Mongoose para      //
// realizar o ODM (Object Data Modelling).                                    //
//----------------------------------------------------------------------------//

// Import do Mongoose:
const mongoose = require('mongoose');

// Definição do Schema para a Collection "Unidades":
const unidadesSchema = mongoose.Schema({
    nome_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    descricao_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    endereco_unidade: {
        type: mongoose.Schema.Types.String,
        required: false,
        default: null
    },
    telefone_unidade: {
        type: mongoose.Schema.Types.String,
        required: false,
        default: null
    },
    email_unidade: {
        type: mongoose.Schema.Types.String,
        required: false,
        default: null
    },
    latlong_unidade: {
        type: mongoose.Schema.Types.String,
        required: false,
        default: null
    },
    data_criacao_unidade: {
        type: mongoose.Schema.Types.Date,
        required: true,
        default: Date.now
    },
    data_alteracao_unidade: {
        type: mongoose.Schema.Types.Date,
        required:false,
        default: null
    }
});




//----------------------------------------------------------------------------//
// Publica o Schema para que possa ser utilizado na aplicação.                //
//----------------------------------------------------------------------------//

// Exporta o Schema da Collection "Unidades":
module.exports = mongoose.model('unidades', unidadesSchema);