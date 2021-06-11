//----------------------------------------------------------------------------//
// Configuração do Model a ser utilizado na tabela "agendamentos", no         //
// banco de dados "postgres", configurado no PostgreSQL. Utilizaremos o       //
// Sequelize para realizar o ORM (Object Relational Modelling).               //
//----------------------------------------------------------------------------//

// Import do Sequelize:
const Sequelize = require('../infra/postgres').Sequelize;
const sequelize = require('../infra/postgres').sequelize;

// Modelo da tabela de agendamentos:
const AgendamentosModel = sequelize.define('agendamentos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    pessoa_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    unidade_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    data_hora: {
        type: Sequelize.DATE,
        allowNull: false
    },
    necessidades_especiais: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    },
    observacoes: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

// Cria a tabela, se não existe:
AgendamentosModel.sync();

// Exporta o modelo:
module.exports = AgendamentosModel;