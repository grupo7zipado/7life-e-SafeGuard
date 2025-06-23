// Imports
// Cria as rotas
const express = require("express")
// Funções da rota
const { CadastroEsp, } = require("../controllers/espControllers");

// Cria as rotas
const espRouter = express.Router();

// Asocia a funções as rotas
// Cadastra os esp
espRouter.post("/esp", CadastroEsp);

// Exporta
module.exports = { espRouter}
