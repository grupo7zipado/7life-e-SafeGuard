// Imports
// Rotas
const { dadosRouter } = require("./dados");
const { espRouter } = require("./esp");
const { usuariosEspRouter } = require("./usuariosEsp");
const { usuariosRouter} = require("./usuarios");

// Express
const express = require('express');

// recebe a propriedade de rotas
const router = express.Router();

// recebe todas as rotas
router.use( "/", dadosRouter );
router.use("/", usuariosRouter)
router.use("/", espRouter)
router.use("/", usuariosEspRouter)

// Exporta o router
module.exports = router;