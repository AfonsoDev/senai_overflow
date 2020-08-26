const express = require('express');
const rotas = require("./routes");
const cors = require("cors");
require("./database");

//iniciando a aplicacao
const app = express();

//habilitar o cors para qualquer origim
app.use(cors());
//nas requisições pode ter corpos no formato json
app.use(express.json());

app.use(rotas);

module.exports = app;