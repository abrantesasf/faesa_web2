//----------------------------------------------------------------------------//
// Configuração das rotas da API para o CRUD das Pessoas utilizando o         //
// PostgreSQL. As rotas utilizarão os métodos programados no Controller       //
// Pessoas.                                                                   //
//----------------------------------------------------------------------------//

// Import do router:
let router = require('express').Router();

// Import dos controllers das pessoas
const pessoasControllerPg = require('../controllers/pessoas-pg');



//----------------------------------------------------------------------------//
// CRUD de pessoas: define quais controllers estão associados a cada rota.    //
//----------------------------------------------------------------------------//

// Para cadastrar uma nova pessoa:
router.post('/', pessoasControllerPg.adicionarPessoa);

// Para realizar buscas por pessoas:
router.get('/', pessoasControllerPg.listarPessoas);
router.get('/:id', pessoasControllerPg.listarPessoaPorId);

// Para atualizar uma pessoa:
router.put('/:id', pessoasControllerPg.atualizarPessoa);

// Para remover uma pessoa:
router.delete('/:id', pessoasControllerPg.removerPessoa);



//----------------------------------------------------------------------------//
// Possibilita que este route possa ser utilizado na aplicação.               //
//----------------------------------------------------------------------------//

// Exporta o router:
module.exports = router;