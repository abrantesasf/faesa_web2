class aluno {

    nome = "";

    constructor(nome){
        this.nome = nome;
    }

    setNome(nome){
        this.nome = nome;
    }

    getNome(){
        console.log(this.nome);
    }
}

module.exports = aluno;