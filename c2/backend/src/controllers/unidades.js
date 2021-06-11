//----------------------------------------------------------------------------//
// Configuração dos Controllers da API Unidades.                              //
//----------------------------------------------------------------------------//

// Import da conexão ao MongoDB:
const mongodb = require('../infra/mongobd');

// Import do schema de unidades:
const unidadesSchema = require('../models/unidades');

// Import do schema de agendamentos:
const agendamentosSchema = require('../models/agendamentos');

// Import do schema de pessoas:
const pessoasSchema = require('../models/pessoas');

// Adiciona uma unidade (antes de adicionar verifica se já existe um registro
// com o mesmo nome: se existir a inserção não é realizada):
exports.adicionarUnidade = (req, res) => {
    let pNomeUnidade = req.body.nome_unidade;
    const query = { nome_unidade: pNomeUnidade };

    unidadesSchema.findOne(query, (err, unidade) => {
        if (unidade) {
            console.log(`Erro! Já existe uma unidade com o nome ${pNomeUnidade}.`);
            res.json({
                status: "erro",
                message: `Erro! Já existe uma unidade com o nome ${pNomeUnidade}.`
            })
            return;
        } else {
            let novaUnidade = new unidadesSchema();
            novaUnidade.nome_unidade = req.body.nome_unidade;
            novaUnidade.descricao_unidade = req.body.descricao_unidade;
            novaUnidade.endereco_unidade = req.body.endereco_unidade;
            novaUnidade.telefone_unidade = req.body.telefone_unidade;
            novaUnidade.email_unidade = req.body.email_unidade;
            novaUnidade.latlong_unidade = req.body.latlong_unidade;
            novaUnidade.save((err) => {
                if (err) {
                    console.log("Erro! Não foi possível inserir a unidade.");
                    res.json({
                        status: "erro",
                        message: "Erro! Não foi possível inserir a unidade.",
                        erro: err
                    });
                } else {
                    console.log("Unidade inserida com sucesso.");
                    res.json({
                        status: "ok",
                        message: "Unidade inserida com sucesso."
                    });
                }
            });
        }
    });
}

// Lista todas as unidades:
exports.listarUnidades = (req, res) => {
    unidadesSchema.find(function(err, unidades) {
        if (err) {
            console.log("Não foi possível recuperar as unidades do MongoDB!");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar as unidades do MongoDB!"
            });
        } else {
            console.log("Unidades listadas.");
            res.json({
                status: "ok",
                unidades: unidades
            });
        }
    });
}

// Lista uma unidade específica por ID:
exports.listarUnidadePorId = (req, res) => {
    let id_unidade = req.params.id;

    unidadesSchema.findById(id_unidade, function(err, unidade) {
        if (err || !unidade) {
            console.log(`Não foi possível recuperar a unidade de ID: ${id_unidade}.`);
            res.json({
                status: "erro",
                message: `Não foi possível recuperar a unidade de ID: ${id_unidade}.`
            });
        } else {
            console.log("Unidade listada.");
            res.json({
                status: "ok",
                unidade: unidade
            });
        }
    });
}

// Listar todas as pessoas associadas a uma unidade específica:
exports.listarPessoasDaUnidade = (req, res) => {
    let id_unidade = req.params.unidade_id;

    unidadesSchema.findById(id_unidade, (err, unidade) => {
        if (err || !unidade) {
            console.log(`Não foi encontrada unidade com o ID ${id_unidade}.`);
            res.json({
                status: "erro",
                message: `Não foi encontrada unidade com o ID ${id_unidade}.`
            });
        } else {
            pessoasSchema.find({unidade_id: id_unidade}, (err, pessoas) => {
                if (err || !pessoas) {
                    console.log("Não foram encontradas pessoas associadas a esta unidade.");
                    res.json({
                        status: "erro",
                        message: "Não foram encontradas pessoas associadas a esta unidade."
                    });
                } else {
                    console.log("Pessoas listadas.");
                    res.json({
                        status: "ok",
                        message: `Pessoas associadas com a unidade: ${id_unidade}`,
                        pessoas: pessoas
                    });
                }
            });
        }
    });
}

// Faz a atualização de uma unidade (a busca é feita por ID):
exports.atualizarUnidade = (req, res) => {
    let id_unidade = req.params.id;

    unidadesSchema.findById(id_unidade, (err, unidade) => {
        if (err || !unidade) {
            console.log(`Não foi possível recuperar a unidade de ID ${id_unidade} para atualização.`);
            res.json({
                status: "erro",
                message: `Não foi possível recuperar a unidade de ID ${id_unidade} para atualização.`
            });
        } else {
            unidade.nome_unidade = req.body.nome_unidade;
            unidade.descricao_unidade = req.body.descricao_unidade;
            unidade.endereco_unidade = req.body.endereco_unidade;
            unidade.telefone_unidade = req.body.telefone_unidade;
            unidade.email_unidade = req.body.email_unidade;
            unidade.latlong_unidade = req.body.latlong_unidade;
            unidade.data_alteracao_unidade = Date.now();
            unidade.save((err) => {
                if (err) {
                    console.log(`Houve um erro ao atualizar a unidade ${unidade.nome_unidade}.`);
                    res.json({
                        status: "erro",
                        message: `Houve um erro ao atualizar a unidade ${unidade.nome_unidade}.`,
                        erro: err
                    });
                } else {
                    console.log(`Unidade ${unidade.nome_unidade} atualizada com sucesso!`);
                    res.json({
                        status: "ok",
                        message: `Unidade ${unidade.nome_unidade} atualizada com sucesso!`
                    });
                }
            });
        }
    });
}

// Remove uma unidade do banco de dados (a busca é feita por ID), desde que
// não esteja ligada a nenhuma pessoa e a nenhum agendamento:
exports.removerUnidade = (req, res) => {
    let id_unidade = req.params.id;

    unidadesSchema.findById(id_unidade, (err, unidade) => {
        if (err || !unidade) {
            console.log(`Unidade de ID ${id_unidade} não encontrada.`);
            res.json({
                status: "erro",
                message: `Unidade de ID ${id_unidade} não encontrada.`
            });
            return;
        } else {
            pessoasSchema.findOne({unidade_id: id_unidade}, (err, pessoa) => {
                if (err || pessoa) {
                    console.log("Esta unidade está relacionada à pessoas, não é possível remover.");
                    res.json({
                        status: "erro",
                        message: "Esta unidade está relacionada à pessoas, não é possível remover."
                    });
                } else {
                    agendamentosSchema.findOne({unidade_id : id_unidade}, (err, agendamento) => {
                        if (err || agendamento) {
                            console.log("Esta unidade tem agendamentos cadastrados, não é possível remover.");
                            res.json({
                                status: "erro",
                                message: "Esta unidade tem agendamentos cadastrados, não é possível remover."
                            });
                        } else {
                            unidadesSchema.deleteOne({
                                _id: id_unidade
                            }, (err) => {
                                if (err) {
                                    console.log("Erro ao remover a unidade.");
                                    res.json({
                                        status: "erro",
                                        message: "Erro ao remover a unidade.",
                                        erro: err
                                    });
                                } else {
                                    console.log("Unidade removida com sucesso.");
                                    res.json({
                                        status: "ok",
                                        message: "Unidade removida com sucesso."
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}