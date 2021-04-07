//----------------------------------------------------------------------------//
// Configuração do schema do banco de dados do MongoDB para os alunos.        //
// Utilizaremos o Mongoose para realizar o ODM (Object Data Modelling).       //
//----------------------------------------------------------------------------//

// Import do Mongoose:
const mongoose = require('mongoose');

// Definição do schema para os alunos:
const alunoSchema = mongoose.Schema({
    nome: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    idade: {
        type: mongoose.Schema.Types.Number,
        required: false
    },
    data_criacao: {
        type: mongoose.Schema.Types.Date,
        required: true,
        default: Date.now
    },
    data_alteracao: {
        type: mongoose.Schema.Types.Date,
        required:false,
        default: null
    }
});




//----------------------------------------------------------------------------//
// Possibilita que este schema possa ser utilizado na aplicação.              //
//----------------------------------------------------------------------------//

// Exporta o schema de alunos:
module.exports = mongoose.model('aluno', alunoSchema);