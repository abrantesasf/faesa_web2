let router = require('express').Router();

let alunos = [];
let alunoAbrantes = {
    id: 0,
    nome: "Abrantes",
    email: "abrantesasf@pm.me"
}
alunos.push(alunoAbrantes); 

router.post('/', (req, res) => {
    //res.json(req.body);
    for(let i = 0; i < alunos.length; i++) {
        if (alunos[i].id == req.body.id || alunos[i].email == req.body.email){
            res.json({
                status: "erro",
                message: "ID ou email já existentes."
            })
            return;
        }
    }
    alunos.push(req.body);
    res.json({
        status: "ok",
        message: "Aluno inserido com sucesso."
    })
})

router.get('/', (req, res) => {
    res.json(alunos);
})

router.get('/:id', (req, res) => {
    let id_aluno = req.params.id;
    for (let i = 0; i < alunos.length; i++) {
        if (alunos[i].id == id_aluno) {
            res.json(alunos[i]);
            return;
        }
    }
    res.json({
        resultado: "erro",
        mensagem: `Aluno com id ${id_aluno} não existe na base de dados.`
    })
})

router.put('/:id', (req, res) => {
    let id_aluno = req.params.id;
    for (let i = 0; i < alunos.length; i++) {
        if (alunos[i].id == id_aluno) {
            alunos[i] = req.body;
            res.json({
                status: "ok",
                message: `Aluno de id ${id_aluno} atualizado com sucesso.`
            })
            return;
        }
    }

    res.json({
        status: "erro",
        message: `Aluno de id ${id_aluno} não encontrado!`
    })
})

router.delete('/:id', (req, res) => {
    let id_aluno = req.params.id;
    for (let i = 0; i < alunos.length; i++) {
        if (alunos[i].id == id_aluno) {
            alunos.splice(i, 1);
            res.json({
                status: "ok",
                message: `Aluno de id ${id_aluno} removido com sucesso.`
            })
            return;
        }
    }

    res.json({
        status: "erro",
        message: `Aluno de id ${id_aluno} não encontrado!`
    })
})

module.exports = router;