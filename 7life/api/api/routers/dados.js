// Imports
// Cria as rotas
const express = require('express');
// Funções da rota
const { AllDataUser, LastDataUsers} = require('../controllers/dadosControllers.js');

// Cria as rotas
const dadosRouter = express.Router();

// Asocia a funções as rotas
// Todos os dados do usuarios
dadosRouter.get('/allDataUser/:use_id', AllDataUser);
// Pega o ultimo registro de dados de todos os usuarios
dadosRouter.get('/lastDataUsers', LastDataUsers);

// Exporta
module.exports = {dadosRouter};