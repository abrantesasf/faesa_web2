//----------------------------------------------------------------------------//
// Configuração das controlles da API alunos.                                 //
//----------------------------------------------------------------------------//

// Import do schema de alunos:
const alunosModel = require('../models/alunos-model');

// Adiciona um aluno (antes de adicionar verifica se já existe um registro
// com o mesmo email: se existir a inserção não é realizada):
exports.adicionarAluno = (req, res) => {
    let pEmail = req.body.email;
    const query = { email: pEmail };

    alunosModel.findOne(query, (err, aluno) => {
        if (aluno) {
            console.log(`Erro! Já existe um cadastro com o email ${pEmail}.`);
            res.json({
                status: "erro",
                message: `Erro! Já existe um cadastro com o email ${pEmail}.`
            })
            return;
        } else {
            let aluno = new alunosModel();
            aluno.nome = req.body.nome;
            aluno.email = req.body.email;
            aluno.idade = req.body.idade;
            aluno.save((err) => {
                if (err) {
                    console.log("Erro! Não foi possível inserir o aluno.");
                    res.json({
                        status: "erro",
                        message: "Erro! Não foi possível inserir o aluno."
                    });
                } else {
                    res.json({
                        status: "ok",
                        message: "Aluno inserido com sucesso."
                    });
                }
            });
        }
    });
}

// Lista todos os alunos:
exports.listarAlunos = (req, res) => {
    alunosModel.find(function(err, alunos) {
        if (err) {
            console.log("Não foi possível recuperar os alunos!");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar os alunos!"
            });
        } else {
            res.json({
                status: "ok",
                alunos: alunos
            });
        }
    });
}

// Lista um aluno específico por ID:
exports.listarAlunoPorId = (req, res) => {
    let id_aluno = req.params.id;

    alunosModel.findById(id_aluno, function(err, aluno) {
        if (err || !aluno) {
            console.log(`Não foi possível recuperar o aluno de id: ${id_aluno}.`);
            res.json({
                status: "erro",
                message: `Não foi possível recuperar o aluno de id: ${id_aluno}.`
            });
        } else {
            res.json({
                status: "ok",
                aluno: aluno
            });
        }
    });
}

// Faz a atualização de um aluno (a busca é feita por ID):
exports.atualizarAluno = (req, res) => {
    let id_aluno = req.params.id;

    alunosModel.findById(id_aluno, (err, aluno) => {
        if (err || !aluno) {
            console.log(`Não foi possível recuperar o aluno de id ${id_aluno} para atualização.`);
            res.json({
                status: "erro",
                message: `Não foi possível recuperar o aluno de id ${id_aluno} para atualização.`
            });
        } else {
            aluno.nome = req.body.nome;
            aluno.email = req.body.email;
            aluno.idade = req.body.idade;
            aluno.data_alteracao = Date.now();
            aluno.save((err => {
                if (err) {
                    res.json({
                        status: "erro",
                        message: "Houve um erro ao atualizar o aluno."
                    });
                } else {
                    res.json({
                        status: "ok",
                        message: `Aluno ${aluno.nome} atualizado com sucesso!`,
                        aluno: aluno
                    });
                }
            }));
        }
    });
}

// Remove um aluno do banco de dados (a busca é feita por ID):
exports.removerAluno = (req, res) => {
    let id_aluno = req.params.id;

    alunosModel.findById(id_aluno, (err, aluno) => {
        if (err || !aluno) {
            console.log(`Aluno de id ${id_aluno} não encontrado.`);
            res.json({
                status: "erro",
                message: `Aluno de id ${id_aluno} não encontrado.`
            });
            return;
        } else {
            alunosModel.deleteOne({
                _id: id_aluno
            }, (err) => {
                if (err) {
                    console.log("Erro ao remover o aluno.");
                    res.json({
                        status: "erro",
                        message: "Erro ao remover o aluno."
                    });
                } else {
                    res.json({
                        status: "ok",
                        message: "Aluno removido com sucesso."
                    });
                }
            });
        }
    });
}