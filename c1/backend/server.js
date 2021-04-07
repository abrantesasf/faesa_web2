//----------------------------------------------------------------------------//
// Configuração geral da aplicação web, utilizando o package Express do Node. //
//----------------------------------------------------------------------------//

// Import do Express e criação do webserver "app":
const express = require('express');
const app = express();

// Configuração da porta; configuração dos hosts que podem se conectar a
// este servidor:
const porta = "3005";
const hosts = "0.0.0.0";
app.listen(porta, hosts, () => {
    console.log(`Servidor OK em: http://${hosts}:${porta}`);
})

// Configura a app para fazer o parse do body das requitições HTML:
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());




//----------------------------------------------------------------------------//
// Configurações para que a app possa se conectar ao MongoDB através do       //
// package Mongoose do Node.                                                  //
//----------------------------------------------------------------------------//

// Import do Mongoose e configurações dos parâmetros de conexão ao MongoDB.
// TODO: melhorar a segurança ao passar dados de user/passwd.
const mongoose = require('mongoose');
mongoose.connect('mongodb://root:root@mongodb:27017/web2?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Abre a conexão ao Mongo e verifica se está ok:
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB!'));
db.once('open', function() {
    console.log("Conexão ao MongoDB realizada com sucesso.");
});




//----------------------------------------------------------------------------//
// Configurações das rotas da aplicação.                                      //
//----------------------------------------------------------------------------//

// Rota "padrão" para requisição da raiz do servidor:
app.get('/', (req, res) => {
    res.json({
        status: "ok",
        message: "Servidor rodando sem problemas (até agora!)."
    })
})

// Rota para as Pessoas:
const pessoasRoutes = require('./src/routes/pessoas');
app.use('/api/pessoas', pessoasRoutes);

// Rota para as Unidades:
const unidadesRoutes = require('./src/routes/unidades');
app.use('/api/unidades', unidadesRoutes);

// Rota para os Agendamentos:
const agendamentosRoutes = require('./src/routes/agendamentos');
app.use('/api/agendamentos', agendamentosRoutes);