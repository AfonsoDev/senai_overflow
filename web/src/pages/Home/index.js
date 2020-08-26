import React, { Component, useState, useEffect } from "react";

import { FiGithub, FiLogOut } from "react-icons/fi";
import "./styles.css";

import fotoPerfil from "../../assets/foto_perfil.png";
import imgPost from "../../assets/post-exemplo.jpg";
import { signOut, getAluno } from "../../services/security";
import { useHistory } from "react-router-dom";
import { api } from "../../services/api";

const Cardpost = ({post}) =>{
  
  const [mostrarComentarios, setMostrarComentarios ] = useState(false);

  const [comentarios, setComentarios] = useState([]);

  const carregarComentarios = async () =>{

    const retorno = await api.get(`/postagens/${post.id}/comentarios`);

    setComentarios(retorno.data);
      setMostrarComentarios(!mostrarComentarios);
  }

  return(
    <div className="card-post">
    <header>
      <img src={fotoPerfil} alt="Foto de Perfil" />
      <strong>{post.Aluno.nome}</strong>
     <p> {post.createdAt}</p>
      {post.gists && (<FiGithub className="icon" size={25} />)}
    </header>
    <body>
    <strong>{post.titulo}</strong>
    <p>{post.descricao}</p>
      <img src={imgPost} alt="Imagem do Post" />
    </body>
    <footer>
      <h1 onClick={carregarComentarios}>Comentários</h1>
      {mostrarComentarios && (<>
      {comentarios.length === 0 && (<p>Seja o primeiro a comentar</p>)}
      {comentarios.map((comit)=>(
        <section>
          <header>
            <img src={fotoPerfil} alt="Foto de Perfil" />
      <strong>{comit.Aluno.nome}</strong>
          <p>{comit.created_at}</p>
          </header>
        <p>{comit.descricao}</p>
      </section>      
        ))}
       </>)}

    </footer>
  </div>
  )
}


function Home() {
  const history = useHistory();
  const [Postagens , setPostagens ] = useState([]);

  useEffect(() =>{
     const carregarPostagens  = async () =>{

      try {
        const retorno = await api.get("/postagens");
        setPostagens(retorno.data);
      } catch (error) {
        
      }
     }
     carregarPostagens();
  },[]);
  
  const alunoSessao = getAluno();

  return (
    <div className="container">
      <header className="header">
        <div>
          <p>SENAI OVERFLOW</p>
        </div>
        <div>
          <input type="search" placeholder="Pesquisar uma Dúvida" />
        </div>
        <div>
          <button
            className="btnSair"
            onClick={() => {
              signOut();
              history.replace("/");
            }}
          >
            Sair <FiLogOut />
          </button>
        </div>
      </header>
      <div className="content">
        <section className="profile">
          <img src={fotoPerfil} alt="Foto de Perfil" />
          <a href="#">Editar Foto</a>
          <strong>Nome:</strong>
          <p>{alunoSessao.nome}</p>
          <strong>Ra:</strong>
          <p>{alunoSessao.ra}</p>
        </section>
        <section className="feed">
            {Postagens.map((post) => ( 
            <Cardpost post={post}/>))}
           
        </section>
      </div>
    </div>
  );
}

export default Home;
