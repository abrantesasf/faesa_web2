//----------------------------------------------------------------------------//
// Configuração do Model a ser utilizado na tabela "unidades", no             //
// banco de dados "postgres", configurado no PostgreSQL. Utilizaremos o       //
// Sequelize para realizar o ORM (Object Relational Modelling).               //
//----------------------------------------------------------------------------//

// Import do Sequelize:
//const Sequelize = require('sequelize');
//const sequelize = new Sequelize('postgres://postgres:postgres@postgres:5432/postgres', {dialect: 'postgres'});
const Sequelize = require('../infra/postgres').Sequelize;
const sequelize = require('../infra/postgres').sequelize;

// Modelo da tabela de unidades:
const UnidadesModel = sequelize.define('unidades', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: true
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    latlong: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

// Cria a tabela, se não existe:
UnidadesModel.sync();

// Exporta o modelo:
module.exports = UnidadesModel;