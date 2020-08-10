//Esse arquivo tem como responsabiliadde cadastrar as rotas da plicação
const express = require("express");
//criando o meu routeirizador
const routes = express.Router();
const alunoController = require("./controllers/aluno");
const postagemController = require("./controllers/postagem");
//Rotas de Usuarios
routes.get("/alunos",alunoController.listar);
routes.post("/alunos",alunoController.store);
routes.get("/alunos/:id",alunoController.buscarPorId);
//Rotas de Postagem
routes.post("/postagens",postagemController.store);
routes.delete("/postagens/:id",postagemController.delete);
module.exports = routes;
