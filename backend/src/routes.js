//Esse arquivo tem como responsabiliadde cadastrar as rotas da plicação
const express = require("express");
//criando o meu routeirizador
const routes = express.Router();
const alunoController = require("./controllers/aluno");
const postagemController = require("./controllers/postagem");
const comentarioController = require("./controllers/comentario");
//Rotas de Usuarios
routes.get("/alunos",alunoController.listar);
routes.post("/alunos",alunoController.store);
routes.get("/alunos/:id",alunoController.buscarPorId);
//Rotas de Postagem
routes.get("/postagens",postagemController.index);
routes.post("/postagens",postagemController.store);
routes.delete("/postagens/:id",postagemController.delete);
//Rotas de comentarios
routes.post("/postagens/:postId/comentarios",comentarioController.store);
module.exports = routes;
