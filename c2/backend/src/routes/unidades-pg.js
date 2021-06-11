//----------------------------------------------------------------------------//
// Configuração das rotas da API para o CRUD das Unidades utilizando o        //
// PostgreSQL. As rotas utilizarão os métodos programados no Controller       //
// Unidades.                                                                  //
//----------------------------------------------------------------------------//

// Import do router:
let router = require('express').Router();

// Import dos controllers das unidades
const unidadesControllerPg = require('../controllers/unidades-pg');



//----------------------------------------------------------------------------//
// CRUD de unidades: define quais controllers estão associados a cada rota.   //
//----------------------------------------------------------------------------//

// Para cadastrar uma nova unidade:
router.post('/', unidadesControllerPg.adicionarUnidade);

// Para realizar buscas por unidades:
router.get('/', unidadesControllerPg.listarUnidades);
router.get('/:id', unidadesControllerPg.listarUnidadePorId);
// TODO:
//router.get('/pessoas/:unidade_id', unidadesControllerPg.listarPessoasDaUnidade);

// Para atualizar uma unidade:
router.put('/:id', unidadesControllerPg.atualizarUnidade);

// Para remover uma unidade:
router.delete('/:id', unidadesControllerPg.removerUnidade);



//----------------------------------------------------------------------------//
// Possibilita que este route possa ser utilizado na aplicação.               //
//----------------------------------------------------------------------------//

// Exporta o router:
module.exports = router;