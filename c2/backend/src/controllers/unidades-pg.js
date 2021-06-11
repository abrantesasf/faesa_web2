//----------------------------------------------------------------------------//
// Configuração dos Controllers da API Unidades.                              //
//----------------------------------------------------------------------------//

// Import do modelo de unidades:
const unidadesModelPg = require('../models/unidades-pg');

// Import do modelo de agendamentos:
//const agendamentosModelPg = require('../models/agendamentos-pg');

// Import do modelo de pessoas:
//const pessoasModelPg = require('../models/pessoas-pg');

// Adiciona uma unidade:
exports.adicionarUnidade = async (req, res) => {
    try {
        const {
            nome,
            descricao,
            endereco,
            telefone,
            email,
            latlong
        } = req.body;

        const novaUnidade = await unidadesModelPg.create({
            nome,
            descricao,
            endereco,
            telefone,
            email,
            latlong
        });

        res.json({
            status: "ok",
            message: "Unidade inserida com sucesso."
        });

    } catch(error) {
        res.json({
            status: "erro",
            message: error
        });
    }
}

// Lista todas as unidades:
exports.listarUnidades = async (req, res) => {
    try {
        const unidades = await unidadesModelPg.findAll();
        res.json({
            status: "ok",
            unidades: unidades
        })
    } catch(error) {
        console.log(error);
        res.json({
            status: "erro",
            message: error
        })
    }
}

// Lista uma unidade específica por ID:
exports.listarUnidadePorId = async (req, res) => {
    let id_unidade = req.params.id;
    try {
        const unidade = await unidadesModelPg.findByPk(id_unidade);
        if (unidade) {
            res.json({
                status: "ok",
                unidade: unidade
            });
        } else {
            res.json({
                status: "erro",
                message: "Não foi possível encontrar a unidade."
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

// Listar todas as pessoas associadas a uma unidade específica:
//exports.listarPessoasDaUnidade = (req, res) => {
    //TODO
//}

// Faz a atualização de uma unidade (a busca é feita por ID):
exports.atualizarUnidade = async (req, res) => {
    try {
        let id_unidade = req.params.id;
        
        const {
            nome,
            descricao,
            endereco,
            telefone,
            email,
            latlong
        } = req.body;

        const unidade = await unidadesModelPg.findByPk(id_unidade);

        if (unidade) {
            unidade.update({
                nome,
                descricao,
                endereco,
                telefone,
                email,
                latlong
            },{
                where: {id: id_unidade}
            });

            res.json({
                status: "ok",
                message: "Unidade atualizada"
            });
        } else {
            res.json({
                status: "erro",
                message: "Unidade não atualizada."
            });
        }
    } catch(error) {
        res.json({
            status: "erro",
            message: error
        });
    }
}

// Remove uma unidade do banco de dados (a busca é feita por ID):
exports.removerUnidade = async (req, res) => {
    let id_unidade = req.params.id;
    try {
        const unidade = await unidadesModelPg.destroy({
            where: {
                id: id_unidade
            }
        }).then(count => {
            if (!count) {
                res.json({
                    status: "error",
                    message: "Não foi possível deletar."
                });
            } else {
                res.json({
                    status: "ok",
                    message: "Unidade deletada com sucesso."
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