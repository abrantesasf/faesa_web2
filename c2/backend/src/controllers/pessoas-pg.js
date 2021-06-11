//----------------------------------------------------------------------------//
// Configuração dos Controllers da API Pessoas.                               //
//----------------------------------------------------------------------------//

// Import do modelo de pessoas:
const pessoasModelPg = require('../models/pessoas-pg');

// Import do modelo de agendamentos:
//const agendamentosModelPg = require('../models/agendamentos-pg');

// Import do modelo de unidades:
//const unidadesModelPg = require('../models/unidades-pg');

// Adiciona uma pessoa:
exports.adicionarPessoa = async (req, res) => {
    try {
        const {
            nome,
            cpf,
            data_nascimento,
            unidade_id,
            grupo_prioritario,
            endereco,
            email
        } = req.body;

        const novaPessoa = await pessoasModelPg.create({
            nome,
            cpf,
            data_nascimento,
            unidade_id,
            grupo_prioritario,
            endereco,
            email
        });

        res.json({
            status: "ok",
            message: "Pessoa inserida com sucesso."
        });

    } catch(error) {
        res.json({
            status: "erro",
            message: error
        });
    }
}

// Lista todas as pessoas:
exports.listarPessoas = async (req, res) => {
    try {
        const pessoas = await pessoasModelPg.findAll();
        res.json({
            status: "ok",
            pessoas: pessoas
        });
    } catch(error) {
        console.log(error);
        res.json({
            status: "erro",
            message: error
        });
    }
}

// Lista uma pessoa específica por ID:
exports.listarPessoaPorId = async (req, res) => {
    let id_pessoa = req.params.id;
    try {
        const pessoa = await pessoasModelPg.findByPk(id_pessoa);
        if (pessoa) {
            res.json({
                status: "ok",
                pessoa: pessoa
            });
        } else {
            res.json({
                status: "erro",
                message: "Não foi possível encontrar a pessoa."
            });
        }
    } catch(error) {
        console.log(error);
        res.json({
            status: "erro",
            message: error
        });
    }
}

// Faz a atualização de uma pessoa (a busca é feita por ID).
exports.atualizarPessoa = async (req, res) => {
    try {
        let id_pessoa = req.params.id;
        
        const {
            nome,
            cpf,
            data_nascimento,
            unidade_id,
            grupo_prioritario,
            endereco,
            email
        } = req.body;

        const pessoa = await pessoasModelPg.findByPk(id_pessoa);

        if (pessoa) {
            pessoa.update({
                nome,
            cpf,
            data_nascimento,
            unidade_id,
            grupo_prioritario,
            endereco,
            email
            },{
                where: {id: id_pessoa}
            });

            res.json({
                status: "ok",
                message: "Pessoa atualizada"
            });
        } else {
            res.json({
                status: "erro",
                message: "Pessoa não atualizada."
            });
        }
    } catch(error) {
        res.json({
            status: "erro",
            message: error
        });
    }
}

// Remove uma pessoa do banco de dados (a busca é feita por ID)
exports.removerPessoa = async (req, res) => {
    let id_pessoa = req.params.id;
    try {
        const pessoa = await pessoasModelPg.destroy({
            where: {
                id: id_pessoa
            }
        }).then(count => {
            if (!count) {
                res.json({
                    status: "error",
                    message: "Não foi possível deletar a pessoa."
                });
            } else {
                res.json({
                    status: "ok",
                    message: "Pessoa deletada com sucesso."
                });
            }
        });
    } catch(error) {
        console.log(error);
        res.json({
            status: "erro",
            message: error
        });
    }
}