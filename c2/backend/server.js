//----------------------------------------------------------------------------//
// Configuração geral da aplicação web, utilizando o package Express do Node. //
//----------------------------------------------------------------------------//

// Carrega as configurações do ambiente:
require('dotenv').config({
    path: process.env.NODE_ENV === "development" ? ".env.dev" : ".env"
});

// Import do Express e criação do webserver "app":
const express = require('express');
const app = express();

// Configuração da porta; configuração dos hosts que podem se conectar a
// este servidor:
//const porta = "3005";
const porta = `${process.env.APP_PORT}`
//const hosts = "0.0.0.0";
const hosts = `${process.env.APP_HOST}`
app.listen(porta, hosts, () => {
    console.log(`Servidor OK em: http://${hosts}:${porta}`);
})

// Configura a app para fazer o parse do body das requitições HTML:
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());




//----------------------------------------------------------------------------//
// Configurações das rotas da aplicação.                                      //
//----------------------------------------------------------------------------//

// Rota "padrão" para requisição da raiz do servidor:
const defaultRoutes = require('./src/routes/default');
app.use('/', defaultRoutes);

// Rota para o MongoDB:
// Unidades:
const unidadesRoutes = require('./src/routes/unidades');
app.use('/api/unidades', unidadesRoutes);
// Pessoas
const pessoasRoutes = require('./src/routes/pessoas');
app.use('/api/pessoas', pessoasRoutes);
// Agendamentos
const agendamentosRoutes = require('./src/routes/agendamentos');
app.use('/api/agendamentos', agendamentosRoutes);

// Rotas para o PostgreSQL:
// Unidades:
const unidadesRoutesPg = require('./src/routes/unidades-pg');
app.use('/api/unidades-pg', unidadesRoutesPg);
// Pessoas
const pessoasRoutesPg = require('./src/routes/pessoas-pg');
app.use('/api/pessoas-pg', pessoasRoutesPg);
// Agendamentos
const agendamentosRoutesPg = require('./src/routes/agendamentos-pg');
app.use('/api/agendamentos-pg', agendamentosRoutesPg);