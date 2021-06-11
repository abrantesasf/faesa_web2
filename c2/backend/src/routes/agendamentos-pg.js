//----------------------------------------------------------------------------//
// Configuração das rotas da API para o CRUD dos Agendamentos utilizando o    //
// PostgreSQL. As rotas utilizarão os métodos programados no Controller       //
// Agendamentos.                                                              //
//----------------------------------------------------------------------------//

// Import do router:
let router = require('express').Router();

// Import dos controllers dos agendamentos:
const agendamentosControllerPg = require('../controllers/agendamentos-pg');



//----------------------------------------------------------------------------//
// CRUD de agendamentos: define quais controllers estão associados a cada     //
// rota.                                                                      //
//----------------------------------------------------------------------------//

// Para cadastrar um novo agendamento:
router.post('/', agendamentosControllerPg.adicionarAgendamento);

// Para realizar buscas por agendamentos:
router.get('/', agendamentosControllerPg.listarAgendamentos);
router.get('/:id', agendamentosControllerPg.listarAgendamentoPorId);
router.get('/pessoa/:pessoa_id', agendamentosControllerPg.listarAgendamentoPorPessoa);
router.get('/unidade/:unidade_id', agendamentosControllerPg.listarAgendamentoPorUnidade);

// Para atualizar um agendamento:
router.put('/:id', agendamentosControllerPg.atualizarAgendamento);

// Para remover um agendamento:
router.delete('/:id', agendamentosControllerPg.removerAgendamento);



//----------------------------------------------------------------------------//
// Possibilita que este route possa ser utilizado na aplicação.               //
//----------------------------------------------------------------------------//

// Exporta o router:
module.exports = router;