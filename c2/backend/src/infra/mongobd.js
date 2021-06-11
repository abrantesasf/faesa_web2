//----------------------------------------------------------------------------//
// Configurações para que a app possa se conectar ao MongoDB através do       //
// package Mongoose do Node.                                                  //
//----------------------------------------------------------------------------//

// Import do Mongoose e configurações dos parâmetros de conexão ao MongoDB.
// TODO: melhorar a segurança ao passar dados de user/passwd.
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=admin`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Abre a conexão ao Mongo e verifica se está ok:
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB!'));
db.once('open', function() {
    console.log("Conexão ao MongoDB realizada com sucesso.");
});

// Exporta a conexão:
module.exports = {mongoose, db};