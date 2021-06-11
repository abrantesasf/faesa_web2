//----------------------------------------------------------------------------//
// Configuração das rotas da API para o CRUD dos Agendamentos utilizando o    //
// MongoDB. As rotas utilizarão os métodos programados no Controller          //
// Agendamentos.                                                              //
//----------------------------------------------------------------------------//

// Import do router:
let router = require('express').Router();

// Import dos controllers dos agendamentos:
const agendamentosController = require('../controllers/agendamentos');



//----------------------------------------------------------------------------//
// CRUD de agendamentos: define quais controllers estão associados a cada     //
// rota.                                                                      //
//----------------------------------------------------------------------------//

// Para cadastrar um novo agendamento:
router.post('/', agendamentosController.adicionarAgendamento);

// Para realizar buscas por agendamentos:
router.get('/', agendamentosController.listarAgendamentos);
router.get('/:id', agendamentosController.listarAgendamentoPorId);
router.get('/pessoa/:pessoa_id', agendamentosController.listarAgendamentoPorPessoa);
router.get('/unidade/:unidade_id', agendamentosController.listarAgendamentoPorUnidade);

// Para atualizar um agendamento:
router.put('/:id', agendamentosController.atualizarAgendamento);

// Para remover um agendamento:
router.delete('/:id', agendamentosController.removerAgendamento);



//----------------------------------------------------------------------------//
// Possibilita que este route possa ser utilizado na aplicação.               //
//----------------------------------------------------------------------------//

// Exporta o router:
module.exports = router;