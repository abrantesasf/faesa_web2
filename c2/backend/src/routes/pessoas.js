//----------------------------------------------------------------------------//
// Configuração das rotas da API para o CRUD das Pessoas utilizando o         //
// MongoDB. As rotas utilizarão os métodos programados no Controller          //
// Pessoas.                                                                   //
//----------------------------------------------------------------------------//

// Import do router:
let router = require('express').Router();

// Import dos controllers das pessoas:
const pessoasController = require('../controllers/pessoas');



//----------------------------------------------------------------------------//
// CRUD de pessoas: define quais controllers estão associados a cada rota.    //
//----------------------------------------------------------------------------//

// Para cadastrar uma nova pessoa:
router.post('/', pessoasController.adicionarPessoa);

// Para realizar buscas por pessoas:
router.get('/', pessoasController.listarPessoas);
router.get('/:id', pessoasController.listarPessoaPorId);

// Para atualizar uma pessoa:
router.put('/:id', pessoasController.atualizarPessoa);

// Para remover uma pessoa:
router.delete('/:id', pessoasController.removerPessoa);



//----------------------------------------------------------------------------//
// Possibilita que este route possa ser utilizado na aplicação.               //
//----------------------------------------------------------------------------//

// Exporta o router:
module.exports = router;