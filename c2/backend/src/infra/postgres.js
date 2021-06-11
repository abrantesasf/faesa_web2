//----------------------------------------------------------------------------//
// Configurações para que a app possa se conectar ao PostgreSQL através do    //
// package Sequelize do Node.                                                  //
//----------------------------------------------------------------------------//

// Import do Sequelize
const Sequelize = require('sequelize');
const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`, {dialect: 'postgres'});

// Abre a conexão ao Postgres e verifica se está ok:
(async () => {
    try{
        const dbPostgres = await sequelize.sync();
        console.log("Conexão ao PostgreSQL realizada com sucesso.");
    } catch(error){
        console.log("Erro de conexão ao PostgreSQL.");
    }
})();

// Exporta a conexão:
module.exports = {sequelize, Sequelize};