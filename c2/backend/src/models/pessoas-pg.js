//----------------------------------------------------------------------------//
// Configuração do Model a ser utilizado na tabela "pessoas", no              //
// banco de dados "postgres", configurado no PostgreSQL. Utilizaremos o       //
// Sequelize para realizar o ORM (Object Relational Modelling).               //
//----------------------------------------------------------------------------//

// Import do Sequelize:
//const Sequelize = require('sequelize');
//const sequelize = new Sequelize('postgres://postgres:postgres@postgres:5432/postgres', {dialect: 'postgres'});
const Sequelize = require('../infra/postgres').Sequelize;
const sequelize = require('../infra/postgres').sequelize;

// Modelo da tabela de pessoas:
const PessoasModel = sequelize.define('pessoas', {
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
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data_nascimento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    unidade_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    grupo_prioritario: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
    }
});

// Cria a tabela, se não existe:
PessoasModel.sync();

// Exporta o modelo:
module.exports = PessoasModel;