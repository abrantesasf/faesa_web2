//----------------------------------------------------------------------------//
// Configuração do Schema a ser utilizado na Collection "Agendamentos", no    //
// banco de dados "web2", configurado no MongoDB. Utilizaremos o Mongoose     //
// para realizar o ODM (Object Data Modelling).                               //
//----------------------------------------------------------------------------//

// Import do Mongoose:
const mongoose = require('mongoose');

// Definição do Schema para a Collection "Agendamentos".
// Esta Collection é um relacionamento N:N entre as Collections
// Pessoas e Unidades.
const agendamentosSchema = mongoose.Schema({
    pessoa_id: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    unidade_id: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    data_hora_agendamento: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    necessidades_especiais_agendamento: {
        type: mongoose.Schema.Types.Boolean,
        required: true,
        default: false
    },
    observacoes_agendamento: {
        type: mongoose.Schema.Types.String,
        require: false,
        default: null
    },
    data_criacao_agendamento: {
        type: mongoose.Schema.Types.Date,
        required: true,
        default: Date.now
    },
    data_alteracao_agendamento: {
        type: mongoose.Schema.Types.Date,
        required:false,
        default: null
    }
});




//----------------------------------------------------------------------------//
// Publica o Schema para que possa ser utilizado na aplicação.                //
//----------------------------------------------------------------------------//

// Exporta o Schema da Collection "Agendamentos":
module.exports = mongoose.model('agendamentos', agendamentosSchema);