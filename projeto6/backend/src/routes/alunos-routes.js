//----------------------------------------------------------------------------//
// Configuração das rotas da API para o CRUD dos alunos. As rotas utilizarão  //
// os métodos programados no controllers alunos.                              //
//----------------------------------------------------------------------------//

// Import do router:
let router = require('express').Router();

// Import dos controllers dos alunos
const alunosControllers = require('../controllers/alunos-controllers');




//----------------------------------------------------------------------------//
// CRUD de alunos: define quais controllers estão associados a cada rota.     //
//----------------------------------------------------------------------------//

// Para criar um aluno:
router.post('/', alunosControllers.adicionarAluno);

// Para buscar os alunos, ou um aluno específico:
router.get('/', alunosControllers.listarAlunos);
router.get('/:id', alunosControllers.listarAlunoPorId);

// Para atualizar um aluno:
router.put('/:id', alunosControllers.atualizarAluno);

// Para apagar um aluno:
router.delete('/:id', alunosControllers.removerAluno);




//----------------------------------------------------------------------------//
// Possibilita que este route possa ser utilizado na aplicação.               //
//----------------------------------------------------------------------------//

// Exporta o router:
module.exports = router;