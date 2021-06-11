//----------------------------------------------------------------------------//
// Configuração das rotas da API para o CRUD das Unidades utilizando o        //
// MongoDB. As rotas utilizarão os métodos programados no Controller          //
// Unidades.                                                                  //
//----------------------------------------------------------------------------//

// Import do router:
let router = require('express').Router();

// Import dos controllers das unidades
const unidadesController = require('../controllers/unidades');



//----------------------------------------------------------------------------//
// CRUD de unidades: define quais controllers estão associados a cada rota.   //
//----------------------------------------------------------------------------//

// Para cadastrar uma nova unidade:
router.post('/', unidadesController.adicionarUnidade);

// Para realizar buscas por unidades:
router.get('/', unidadesController.listarUnidades);
router.get('/:id', unidadesController.listarUnidadePorId);
router.get('/pessoas/:unidade_id', unidadesController.listarPessoasDaUnidade);

// Para atualizar uma unidade:
router.put('/:id', unidadesController.atualizarUnidade);

// Para remover uma unidade:
router.delete('/:id', unidadesController.removerUnidade);



//----------------------------------------------------------------------------//
// Possibilita que este route possa ser utilizado na aplicação.               //
//----------------------------------------------------------------------------//

// Exporta o router:
module.exports = router;