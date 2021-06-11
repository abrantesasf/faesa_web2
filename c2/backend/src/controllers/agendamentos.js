//----------------------------------------------------------------------------//
// Configuração dos Controllers da API Agendamentos.                          //
//----------------------------------------------------------------------------//

// Import da conexão ao MongoDB:
const mongodb = require('../infra/mongobd');

// Import do schema de agendamentos:
//const agendamentos = require('../models/agendamentos');
const agendamentosSchema = require('../models/agendamentos');

// Import do schema de pessoas:
const pessoasSchema = require('../models/pessoas');

// Import do scheme de unidades:
const unidadesSchema = require('../models/unidades');

// Adiciona um agendamento. Antes de adicionar, faz as seguintes validações:
// - Já existe um agendamento para a data/hora? se existir, não agenda;
// - Existe pessoa com o ID informado? se não existir, não agenda;
// - Existe unidade com o ID informado? se não existir, não agenda.
//
// TODO: este é, com certeza, um dos códigos mais feios, imbecis e ridículos
//       que eu já escrevi. Qualquer professor que realmente ler esse trecho
//       entrará com uma petição na faculdade para me mandar de volta ao 1º
//       período, sem chance de eliminar matérias já aprovadas, para ver se
//       largo de ser burro. Fazer o que, não é... ainda não sei resolver
//       questões de promise/async functions no DS (DesgraçaScript, vulgo
//       JavaScript), e o prazo para a entrega da avaliação está acabando.
//       Conclusão: quanto mais eu estudo DS, mais eu gosto de LISP...
exports.adicionarAgendamento = (req, res) => {
    let pDataHoraAgendamento = req.body.data_hora_agendamento;
    let pPessoaId = req.body.pessoa_id;
    let pUnidadeId = req.body.unidade_id;

    // Tem agendamento no mesmo dia/horário?
    agendamentosSchema.countDocuments({
        data_hora_agendamento: pDataHoraAgendamento
    }, (err, count) => {
        if (err || count > 0) {
            console.log("Já existe agendamento neste horário.");
            res.json({
                status: "erro",
                message: "Já existe agendamento neste horário."
            })
        } else {
            // Existe uma pessoa com o ID informado?
            pessoasSchema.findById(pPessoaId, (err, pessoa) => {
                if (err || !pessoa) {
                    console.log("Não existe pessoa com o ID informado.");
                    res.json({
                        status: "erro",
                        message: "Não existe pessoa com o ID informado."
                    })
                } else {
                    // Existe uma unidade com o ID informado?
                    unidadesSchema.findById(pUnidadeId, (err, unidade) => {
                        if (err || !unidade) {
                            console.log("Não existe unidade com o ID informado.");
                            res.json({
                                status: "erro",
                                message: "Não existe unidade com o ID informado."
                            });
                        } else {
                            // OK, validou. Vamos inserir o agendamento:
                            let novoAgendamento = new agendamentosSchema();
                            novoAgendamento.pessoa_id = req.body.pessoa_id;
                            novoAgendamento.unidade_id = req.body.unidade_id;
                            novoAgendamento.data_hora_agendamento = req.body.data_hora_agendamento;
                            novoAgendamento.necessidades_especiais_agendamento = req.body.necessidades_especiais_agendamento;
                            novoAgendamento.observacoes_agendamento = req.body.observacoes_agendamento;
                            novoAgendamento.save((err) => {
                                if (err) {
                                    console.log("Erro! Não foi possível inserir o agendamento.");
                                    res.json({
                                        status: "erro",
                                        message: "Erro! Não foi possível inserir o agendamento.",
                                        erro: err
                                    });
                                } else {
                                    console.log("Agendamento inserido com sucesso.")
                                    res.json({
                                        status: "ok",
                                        message: "Agendamento inserido com sucesso."
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
         
// Lista todos os agendamentos:
exports.listarAgendamentos = (req, res) => {
    agendamentosSchema.find(function(err, agendamentos) {
        if (err) {
            console.log("Não foi possível recuperar os agendamentos!");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar os agendamentos!"
            });
        } else {
            res.json({
                status: "ok",
                agendamentos: agendamentos
            });
        }
    });
}

// Lista um agendamento específico por ID:
exports.listarAgendamentoPorId = (req, res) => {
    let id_agendamento = req.params.id;

    agendamentosSchema.findById(id_agendamento, function(err, agendamento) {
        if (err || !agendamento) {
            console.log(`Agendamento de ID ${id_agendamento} não encontrado.`);
            res.json({
                status: "erro",
                message: `Agendamento de ID ${id_agendamento} não encontrado.`
            });
        } else {
            res.json({
                status: "ok",
                agendamento: agendamento
            });
        }
    });
}

// Listar agendamentos por pessoa (a busca é feita pelo ID da pessoa):
exports.listarAgendamentoPorPessoa = (req, res) => {
    let id_pessoa = req.params.pessoa_id;

    pessoasSchema.findById(id_pessoa, (err, pessoa) => {
        if (err || !pessoa) {
            console.log("Não foi possível encontrar a pessoa com o ID informado.");
            res.json({
                status: "erro",
                message: "Não foi possível encontrar a pessoa com o ID informado."
            });
        } else {
            agendamentosSchema.find({pessoa_id: id_pessoa}, (err, agendamentos) => {
                if (err || !agendamentos) {
                    console.log("Não há agendamentos para essa pessoa.");
                    res.json({
                        status: "erro",
                        message: "Não há agendamentos para essa pessoa."
                    });
                } else {
                    console.log("Agendamentos listados.");
                    res.json({
                        status: "ok",
                        message: `Agendamentos para a pessoa: ${id_pessoa}`,
                        agendamentos: agendamentos
                    });
                }
            });
        }
    })
}

// Listar agendamentos por unidade (a busca é feita pelo ID da unidade):
exports.listarAgendamentoPorUnidade = (req, res) => {
    let id_unidade = req.params.unidade_id;

    unidadesSchema.findById(id_unidade, (err, unidade) => {
        if (err || !unidade) {
            console.log("Não foi possível encontrar a unidade com o ID informado.");
            res.json({
                status: "erro",
                message: "Não foi possível encontrar a unidade com o ID informado."
            });
        } else {
            agendamentosSchema.find({unidade_id: id_unidade}, (err, agendamentos) => {
                if (err || !agendamentos) {
                    console.log("Não há agendamentos para essa unidade.");
                    res.json({
                        status: "erro",
                        message: "Não há agendamentos para essa unidade."
                    });
                } else {
                    console.log("Agendamentos listados.");
                    res.json({
                        status: "ok",
                        message: `Agendamentos para a unidade: ${id_unidade}`,
                        agendamentos: agendamentos
                    });
                }
            });
        }
    })
}

// Faz a atualização de um agendamento (a busca é feita por ID). Também
// valida se alterações no ID de pessoas ou de unidades são válidas.
exports.atualizarAgendamento = (req, res) => {
    let id_agendamento = req.params.id;

    agendamentosSchema.findById(id_agendamento, (err, agendamento) => {
        if (err || !agendamento) {
            console.log(`Não foi possível recuperar o agendamento de ID ${id_agendamento} para atualização.`);
            res.json({
                status: "erro",
                message: `Não foi possível recuperar o agendamento de ID ${id_agendamento} para atualização.`
            });
        } else {
            pessoasSchema.findById(req.body.pessoa_id, function(err, pessoa){
                if (err || !pessoa) {
                    console.log("Não existe uma pessoa com o ID informado.");
                    res.json({
                        status: "erro",
                        message: "Não existe uma pessoa com o ID informado."
                    });
                } else {
                    unidadesSchema.findById(req.body.unidade_id, function(err, unidade){
                        if (err || !unidade) {
                            console.log("Não existe uma unidade com o ID informado.");
                            res.json({
                                status: "erro",
                                message: "Não existe uma unidade com o ID informado."
                            });
                        } else {
                            agendamento.pessoa_id = req.body.pessoa_id;
                            agendamento.unidade_id = req.body.unidade_id;
                            agendamento.data_hora_agendamento = req.body.data_hora_agendamento;
                            agendamento.necessidades_especiais_agendamento = req.body.necessidades_especiais_agendamento;
                            agendamento.observacoes_agendamento = req.body.observacoes_agendamento;
                            agendamento.save((err) => {
                                if (err) {
                                    console.log(`Erro ao atualizar o agendamento de ID ${id_agendamento}.`);
                                    res.json({
                                        status: "erro",
                                        message: `Erro ao atualizar o agendamento de ID ${id_agendamento}.`,
                                        erro: err
                                    });
                                } else {
                                    console.log(`Agendamento com o ID ${id_agendamento} atualizado com sucesso!`);
                                    res.json({
                                        status: "ok",
                                        message: `Agendamento com o ID ${id_agendamento} atualizado com sucesso!`
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

// Remove um agendamento do banco de dados (a busca é feita por ID):
exports.removerAgendamento = (req, res) => {
    let id_agendamento = req.params.id;

    agendamentosSchema.findById(id_agendamento, (err, agendamento) => {
        if (err || !agendamento) {
            console.log(`Agendamento de ID ${id_agendamento} não encontrado.`);
            res.json({
                status: "erro",
                message: `Agendamento de ID ${id_agendamento} não encontrado.`
            });
            return;
        } else {
            agendamentosSchema.deleteOne({
                _id: id_agendamento
            }, (err) => {
                if (err) {
                    console.log("Erro ao remover o agendamento.");
                    res.json({
                        status: "erro",
                        message: "Erro ao remover o agendamento."
                    });
                } else {
                    console.log("Agendamento removido com sucesso.")
                    res.json({
                        status: "ok",
                        message: "Agendamento removido com sucesso."
                    });
                }
            });
        }
    });
}