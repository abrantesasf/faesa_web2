//----------------------------------------------------------------------------//
// Configuração dos Controllers da API Agendamentos.                          //
//----------------------------------------------------------------------------//

// Import do model de agendamentos:
const agendamentosModelPg = require('../models/agendamentos-pg');

// Import do model de pessoas:
const pessoasModelPg = require('../models/pessoas-pg');

// Import do model de unidades:
const unidadesModelPg = require('../models/unidades-pg');

// Adiciona um agendamento:
exports.adicionarAgendamento = async (req, res) => {
    try {
        const {
            pessoa_id,
            unidade_id,
            data_hora,
            necessidades_especiais,
            observacoes
        } = req.body;

        const pessoa = await pessoasModelPg.findByPk(pessoa_id);
        const unidade = await unidadesModelPg.findByPk(unidade_id);

        if (!pessoa || !unidade) {
            res.json({
                status: "erro",
                message: "A pessoa e/ou a unidade informada não existem."
            });
        } else {
            const novoAgendamento = await agendamentosModelPg.create({
                pessoa_id,
                unidade_id,
                data_hora,
                necessidades_especiais,
                observacoes
            });

            res.json({
                status: "ok",
                message: "Agendamento inserido com sucesso."
            });
        }

    } catch(error) {
        res.json({
            status: "erro",
            messagem: error
        });
    }
}
         
// Lista todos os agendamentos:
exports.listarAgendamentos = async (req, res) => {
    try {
        const agendamentos = await agendamentosModelPg.findAll();
        res.json({
            status: "ok",
            agendamentos: agendamentos
        });
    } catch(error) {
        console.log(error);
        res.json({
            status: "erro",
            message: error
        });
    }
}

// Lista um agendamento específico por ID:
exports.listarAgendamentoPorId = async (req, res) => {
    let id_agendamento = req.params.id;
    try {
        const agendamento = await agendamentosModelPg.findByPk(id_agendamento);
        if (agendamento) {
            res.json({
                status: "ok",
                pessoa: agendamento
            });
        } else {
            res.json({
                status: "erro",
                message: "Não foi possível encontrar o agendamento."
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

// Listar agendamentos por pessoa (a busca é feita pelo ID da pessoa):
exports.listarAgendamentoPorPessoa = async (req, res) => {
    let id_pessoa = req.params.pessoa_id;
    try {
        const pessoa = await pessoasModelPg.findByPk(id_pessoa);
        if (!pessoa) {
            res.json({
                status: "erro",
                message: "A pessoa informada não existe."
            });
        } else {
            const agendamentos = await agendamentosModelPg.findAll({
                where: {
                    pessoa_id: id_pessoa
                }
            });
        
            if (!agendamentos) {
                res.json({
                    status: "erro",
                    message: "Não existem agendamentos para essa pessoa."
                });
            } else {
                res.json({
                    status: "ok",
                    message: agendamentos
                });
            }
        }
    } catch(error) {
        res.json({
            status: "erro",
            message: error
        });
    }
}

// Listar agendamentos por unidade (a busca é feita pelo ID da unidade):
exports.listarAgendamentoPorUnidade = async (req, res) => {
    let id_unidade = req.params.unidade_id;
    try {
        const unidade = await unidadesModelPg.findByPk(id_unidade);
        if (!unidade) {
            res.json({
                status: "erro",
                message: "A unidade informada não existe."
            });
        } else {
            const agendamentos = await agendamentosModelPg.findAll({
                where: {
                    unidade_id: id_unidade
                }
            });
        
            if (!agendamentos) {
                res.json({
                    status: "erro",
                    message: "Não existem agendamentos para essa unidade."
                });
            } else {
                res.json({
                    status: "ok",
                    message: agendamentos
                });
            }
        }
    } catch(error) {
        res.json({
            status: "erro",
            message: error
        });
    }
}

// Faz a atualização de um agendamento (a busca é feita por ID). Também
// valida se alterações no ID de pessoas ou de unidades são válidas.
exports.atualizarAgendamento = async (req, res) => {
    try {
        let id_agendamento = req.params.id;
        
        const {
            pessoa_id,
            unidade_id,
            data_hora,
            necessidades_especiais,
            observacoes
        } = req.body;

        const agendamento = await agendamentosModelPg.findByPk(id_agendamento);

        if (agendamento) {
            agendamento.update({
                pessoa_id,
                unidade_id,
                data_hora,
                necessidades_especiais,
                observacoes
            },{
                where: {id: id_agendamento}
            });

            res.json({
                status: "ok",
                message: "Agendamento atualizado"
            });
        } else {
            res.json({
                status: "erro",
                message: "Agendamento não atualizado."
            });
        }
    } catch(error) {
        res.json({
            status: "erro",
            message: error
        });
    }
}

// Remove um agendamento do banco de dados (a busca é feita por ID):
exports.removerAgendamento = async (req, res) => {
    let id_agendamento = req.params.id;
    try {
        const agendamento = await agendamentosModelPg.destroy({
            where: {
                id: id_agendamento
            }
        }).then(count => {
            if (!count) {
                res.json({
                    status: "error",
                    message: "Não foi possível deletar o agendamento."
                });
            } else {
                res.json({
                    status: "ok",
                    message: "Agendamento deletado com sucesso."
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