//----------------------------------------------------------------------------//
// Configuração das rotas da API para o CRUD dos Agendamentos. As rotas       //
// utilizarão os métodos programados no Controller Pessoas.                   //
//----------------------------------------------------------------------------//

// Import do router:
let router = require('express').Router();

// Import dos controllers dos alunos
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

// Para atualizar um agendamento:
router.put('/:id', agendamentosController.atualizarAgendamento);

// Para remover um agendamento:
router.delete('/:id', agendamentosController.removerAgendamento);




//----------------------------------------------------------------------------//
// Possibilita que este route possa ser utilizado na aplicação.               //
//----------------------------------------------------------------------------//

// Exporta o router:
module.exports = router;