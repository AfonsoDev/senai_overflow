import React, { useState } from "react";
import {Container, ImageCropped, Form, Titulo, SubTitulo, InputGroup, Button} from "./styles";
import foto from "../../assets/foto.jpg";
import { api } from "../../services/api";

const FormLogin = (props) =>{
    
    const [alunoLogin, setAlunoLogin] = useState({
        email: "",
        senha: ""
    })
    const handlerInput = (e) =>{
        setAlunoLogin({...alunoLogin, [e.target.id]: e.target.value});
        
    }


    const entrar = async (e) =>{

        e.preventDefault();
        try {
            const retorno = await  api.post("/sessao", alunoLogin);
            if(retorno.status == 201){
                window.alert("Logado com sucesso");
            }
        } catch (erro) {
          if(erro.response){
           return window.alert(erro.response.data.erro);
          }
          window.alert("Ops.. Tente novamente mais tarde!");
        }
  
    }
    return(
    <Form onSubmit={entrar}>
        <Titulo>SENAI OVERFLOW</Titulo>
        <SubTitulo>Compartilhe suas dúvidas</SubTitulo>
        <InputGroup>
            <label>E-mail</label>
            <input type="email" value={alunoLogin.email} id="email" onChange={handlerInput} placeholder="Insira seu email" required></input>
        </InputGroup>
        <InputGroup>
            <label>Senha</label>
            <input type="password" value={alunoLogin.senha} id="senha" onChange={handlerInput} placeholder="Insira sua Senha" required></input>
        </InputGroup>
        <Button type="submit">
            Entrar
        </Button>
        <Button type="button" onClick={() =>{
            props.mostrarForm("registrar");
        }}>
            Registrar-se
        </Button>
    </Form>
    )
}
const FormRegistrar = (props) =>{
    
    const [alunoRegistrar, setalunoRegistrar] = useState({
        ra: "",
        nome: "",
        email: "",
        senha: ""

    })
    const handlerInput = (e) =>{
        setalunoRegistrar({...alunoRegistrar, [e.target.id]: e.target.value});
        
    }


    const registrar = async (e) =>{

        e.preventDefault();
        try {
            const retorno = await  api.post("/alunos", alunoRegistrar);
            if(retorno.status == 201){
                window.alert("Registrado com sucesso");
            }
        } catch (erro) {
          if(erro.response){
           return window.alert(erro.response.data.erro);
          }
          window.alert("Ops.. Tente novamente mais tarde!");
        }
  
    }
    return(
    <Form onSubmit={registrar}>
        <Titulo>SENAI OVERFLOW</Titulo>
        <SubTitulo>Compartilhe suas dúvidas</SubTitulo>
        <InputGroup>
            <label>Ra</label>
            <input type="number" value={alunoRegistrar.ra} id="ra" onChange={handlerInput} placeholder="Insira seu ra" required></input>
        </InputGroup>
        <InputGroup>
            <label>Nome</label>
            <input type="text" value={alunoRegistrar.nome} id="nome" onChange={handlerInput} placeholder="Insira seu nome" required></input>
        </InputGroup>
        <InputGroup>
            <label>E-mail</label>
            <input type="email" value={alunoRegistrar.email} id="email" onChange={handlerInput} placeholder="Insira seu email" required></input>
        </InputGroup>
        <InputGroup>
            <label>Senha</label>
            <input type="password" value={alunoRegistrar.senha} id="senha" onChange={handlerInput} placeholder="Insira sua Senha" required></input>
        </InputGroup>
        <Button type="submit">
            Enviar
        </Button>
        <Button type="button" onClick={() =>{
            props.mostrarForm("login");
        }}>
           Ja sou cadastrado
        </Button>
    </Form>
    )
}

const Login = () =>{

const [mostrarForm, setMostrarForm] = useState("login");
   
    return(
        <Container>
            <ImageCropped>
                <img src={foto} alt="Foto"/>
            </ImageCropped>
            {mostrarForm === "login" ?  <FormLogin mostrarForm={setMostrarForm}/>:<FormRegistrar mostrarForm={setMostrarForm} />}
        
         
        </Container>
    )
}
export default Login;