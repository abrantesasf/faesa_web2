//----------------------------------------------------------------------------//
// Configuração da rota padrão da aplicação.                                  //
//----------------------------------------------------------------------------//

const { response } = require('express');

// Import do router:
let router = require('express').Router();
var path = require("path");

// Rota padrão:
router.get('/', (req, res) => {
    //res.json({
    //    status: "ok",
    //    message: "Servidor rodando sem problemas (até agora!)."
    //})
    res.sendFile(path.join(__dirname, '../../', 'index.html'));
});

// Export do router:
module.exports = router;