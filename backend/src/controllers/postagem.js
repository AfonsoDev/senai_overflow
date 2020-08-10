const Postagem = require("../models/Postagem");

module.exports = {
    async store(req,res){
        const token = req.headers.authorization;
        const [bearer, created_aluno_id] = token.split(" ");
        const { titulo, descricao, imagem, gists } = req.body;

        let post=  await Postagem.create({  
            titulo, 
            descricao, 
            imagem, 
            gists, 
            created_aluno_id,
        });
        res.status(201).send(post);
    },
    async delete(req,res){
        //pegando o id do aluno que esta logado 
        const token = req.headers.authorization;
        const [bearer, created_aluno_id] = token.split(" ");
        //pegando o id a ser apagado
        const {id} = req.params;
        //procura o post pelo id
        let postagem = await Postagem.findByPk(id);
        // se a postagem nao existir retorna not found
        if(!postagem){
            return res.status(404).send({erro: "Postagem não encontrada"});
        }
        //Se o aluno logado for diferente do aliuno que criou a postagem retorna nao autotizado
        if(postagem.created_aluno_id != created_aluno_id){
            return res.status(401).send({erro:"Você não tem permissão para essa ação"});
        }
        await postagem.destroy();
        res.status(204).send();
    },
}