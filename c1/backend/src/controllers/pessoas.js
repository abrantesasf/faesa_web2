//----------------------------------------------------------------------------//
// Configuração dos Controllers da API Pessoas.                               //
//----------------------------------------------------------------------------//

// Import do schema de alunos:
const pessoasSchema = require('../models/pessoas');

// Import do schema de agendamentos:
const agendamentosSchema = require('../models/agendamentos');

// Import do schema de unidades:
const unidadesSchema = require('../models/unidades');

// Adiciona uma pessoa, validando o seguite:
// - Se já existe o mesmo CPF cadastrado, não insere;
// - Se a unidade não está cadastrada, não insere.
exports.adicionarPessoa = (req, res) => {
    let pCpf = req.body.cpf_pessoa;
    const query = { cpf_pessoa: pCpf };

    pessoasSchema.findOne(query, (err, pessoa) => {
        if (pessoa) {
            console.log(`Erro! Já existe um cadastro com o CPF ${pCpf}.`);
            res.json({
                status: "erro",
                message: `Erro! Já existe um cadastro com o CPF ${pCpf}.`
            });
            return;
        } else {
            unidadesSchema.findById(req.body.unidade_id, function(err, unidade) {
                if (err || !unidade) {
                    console.log("Erro, unidade não econtrada.");
                    res.json({
                        status: "erro",
                        message: "Erro, unidade não econtrada."
                    });
                } else {
                    let novaPessoa = new pessoasSchema();
                    novaPessoa.nome_pessoa = req.body.nome_pessoa;
                    novaPessoa.cpf_pessoa = req.body.cpf_pessoa;
                    novaPessoa.data_nascimento_pessoa = req.body.data_nascimento_pessoa;
                    novaPessoa.unidade_id = req.body.unidade_id;
                    novaPessoa.grupo_prioritario_pessoa = req.body.grupo_prioritario_pessoa;
                    novaPessoa.endereco_pessoa = req.body.endereco_pessoa;
                    novaPessoa.telefone_pessoa = req.body.telefone_pessoa;
                    novaPessoa.email_pessoa = req.body.email_pessoa;
                    novaPessoa.save((err) => {
                        if (err) {
                            console.log("Erro! Não foi possível inserir a pessoa.");
                            res.json({
                                status: "erro",
                                message: "Erro! Não foi possível inserir a pessoa.",
                                erro: err
                            });
                        } else {
                            console.log("Pessoa inserida com sucesso.");
                            res.json({
                                status: "ok",
                                message: "Pessoa inserida com sucesso."
                            });
                        }
                    });
                }
            });
        }
    });
}

// Lista todas as pessoas:
exports.listarPessoas = (req, res) => {
    pessoasSchema.find(function(err, pessoas) {
        if (err) {
            console.log("Não foi possível recuperar as pessoas!");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar as pessoas!"
            });
        } else {
            console.log("Pessoas listadas.");
            res.json({
                status: "ok",
                pessoas: pessoas
            });
        }
    });
}

// Lista uma pessoa específica por ID:
exports.listarPessoaPorId = (req, res) => {
    let id_pessoa = req.params.id;

    pessoasSchema.findById(id_pessoa, function(err, pessoa) {
        if (err || !pessoa) {
            console.log(`Não foi possível recuperar a pessoa de ID: ${id_pessoa}.`);
            res.json({
                status: "erro",
                message: `Não foi possível recuperar a pessoa de ID: ${id_pessoa}.`
            });
        } else {
            console.log("Pessoa listada.");
            res.json({
                status: "ok",
                pessoa: pessoa
            });
        }
    });
}

// Faz a atualização de uma pessoa (a busca é feita por ID), e
// verifica se o ID da unidade continua válido para a atualização.
exports.atualizarPessoa = (req, res) => {
    let id_pessoa = req.params.id;

    pessoasSchema.findById(id_pessoa, (err, pessoa) => {
        if (err || !pessoa) {
            console.log(`Não foi possível recuperar a pessoa de ID ${id_aluno} para atualização.`);
            res.json({
                status: "erro",
                message: `Não foi possível recuperar a pessoa de ID ${id_aluno} para atualização.`
            });
        } else {
            unidadesSchema.findById(req.body.unidade_id, function(err, unidade) {
                if (err || !unidade) {
                    console.log("Erro, unidade não econtrada.");
                    res.json({
                        status: "erro",
                        message: "Erro, unidade não econtrada."
                    });
                } else {
                    pessoa.nome_pessoa = req.body.nome_pessoa;
                    pessoa.cpf_pessoa = req.body.cpf_pessoa;
                    pessoa.data_nascimento_pessoa = req.body.data_nascimento_pessoa;
                    pessoa.grupo_prioritario_pessoa = req.body.grupo_prioritario_pessoa;
                    pessoa.endereco_pessoa = req.body.endereco_pessoa;
                    pessoa.telefone_pessoa = req.body.telefone_pessoa;
                    pessoa.email_pessoa = req.body.email_pessoa;
                    pessoa.data_alteracao_pessoa = Date.now();
                    pessoa.save((err) => {
                        if (err) {
                            console.log(`Houve um erro ao atualizar a pessoa ${pessoa.nome_pessoa}.`);
                            res.json({
                                status: "erro",
                                message: `Houve um erro ao atualizar a pessoa ${pessoa.nome_pessoa}.`,
                                erro: err
                            });
                        } else {
                            console.log(`Pessoa ${pessoa.nome_pessoa} atualizado com sucesso!`);
                            res.json({
                                status: "ok",
                                message: `Pessoa ${pessoa.nome_pessoa} atualizado com sucesso!`
                            });
                        }
                    });
                }
            });
        }
    });
}

// Remove uma pessoa do banco de dados (a busca é feita por ID), desde
// que não exista nenhum agendamento registrado para ela.
exports.removerPessoa = (req, res) => {
    let id_pessoa = req.params.id;

    pessoasSchema.findById(id_pessoa, (err, pessoa) => {
        if (err || !pessoa) {
            console.log(`Pessoa de ID ${id_pessoa} não encontrada.`);
            res.json({
                status: "erro",
                message: `Pessoa de ID ${id_pessoa} não encontrada.`
            });
            return;
        } else {
            agendamentosSchema.findOne({pessoa_id: id_pessoa}, (err, agendamento) => {
                if (err || agendamento) {
                    console.log("Esta pessoa tem agendamentos cadastrados, não é possível remover.");
                    res.json({
                        status: "erro",
                        message: "Esta pessoa tem agendamentos cadastrados, não é possível remover."
                    });
                } else {
                    pessoasSchema.deleteOne({
                        _id: id_pessoa
                    }, (err) => {
                        if (err) {
                            console.log("Erro ao remover a pessoa.");
                            res.json({
                                status: "erro",
                                message: "Erro ao remover a pessoa.",
                                erro: err
                            });
                        } else {
                            console.log("Pessoa removida com sucesso.");
                            res.json({
                                status: "ok",
                                message: "Pessoa removida com sucesso."
                            });
                        }
                    });
                }
            });            
        }
    });
}