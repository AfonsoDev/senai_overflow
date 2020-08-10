const {Op} = require("sequelize");
const Aluno = require("../models/Alunos");

module.exports = {
    //Lista todos os alunos
    async listar(req, res){
        const aluno = await Aluno.findAll();
        res.send(aluno);
    },
    //Listar um aluno pelo id
    async buscarPorId(req,res){
        const {id} = req.params;

        //Buscar o aluno pela chave
        const aluno = await Aluno.findByPk(id, {raw:true});

        console.log(aluno);
        //Verifica se o aluno nao foi encontrado
        if(!aluno){
           return res.status(404).send({error:"Aluno nao encontrado"});
        }

        delete aluno.senha;
        //retorna o aluno encontrado
        res.send(aluno);
    },
    //Inserções 
    async store(request,response){
        const {ra, nome, email, senha} = request.body;
        //Cadastrar aluno do banco de dados

        //verficar aluno se ja existe 
        let aluno = await Aluno.findOne({
            where:{[Op.or]: [{ra:ra},{email:email}]}});

        if(aluno){
            return response.status(400).send({error: "Aluno ja cadastrado"})
        }

        aluno = await Aluno.create({ ra:ra, nome:nome, email:email, senha:senha });
  
        response.status(201).send(aluno);
    },
    update(){

    },
    delete(){

    }
};