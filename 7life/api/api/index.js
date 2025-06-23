//Imports
const cors = require('cors');
const express = require('express');

//rotas
const router = require('./routers/router');

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

//porta que o node vai roda
const porta = 3333;

app.listen(porta, () => {
    console.log('Servidor iniciado na porta ' + porta); 
});