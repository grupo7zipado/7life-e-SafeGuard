// Imports
// Cria as rotas
const express = require("express");
// Funções da rota
const { CadatroUsuarioEsp, ListarUsuariosEsps } = require("../controllers/usuariosEspControllers");

// Cria as rotas
const usuariosEspRouter = express.Router();

// Relaciona o usuário ao esp
usuariosEspRouter.post("/usuariosEsp", CadatroUsuarioEsp);;
// Pega todos os usuários e esps cadastrados no banco
usuariosEspRouter.get("/usuariosEsp", ListarUsuariosEsps);

// Exporta
module.exports = { usuariosEspRouter}
