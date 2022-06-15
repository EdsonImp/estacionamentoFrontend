import { createContext, useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import './Login.css'
import Main from "../templates/Main";
import useAuth from "./UseAUth";



const Login = () => {
  //funcões vindas de autenticação-auth- por meuo de useauth
  const { signin, signout, resp, usuario } = useAuth();
  

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");


  const logar = () => {
    if (!email | !senha) { //verifica se foi digitado algo nos campos
      setError("Preencha todos os campos");
      return;
    }

    signin(email, senha);
    
    
    
  };
  function logout() {
    signout()
  }


  //localStorage.getItem('usuario') == ''?
  return (

    <Main icon="sign-in" title="Login" subtitle="Sistema de Estacionamento">
      <div className="display-4">Bem vindo!</div>
      <hr />
      {usuario == null ?
        <p className='mb-0'>Por favor, entre com suas credenciais </p> : ''}


      <div className="email">
        {usuario == null ?

          < form>
            <input type="email"
              placeholder="Digite seu E-mail" onChange={(e) => [setEmail(e.target.value), setError("")]} />
          </form> : ''}
        {usuario == null ?
          <form>
            <input type="password" placeholder="Digite a senha" onChange={(e) => [setSenha(e.target.value), setError("")]} />
          </form> : ''}
        <label className="label-error">{error}</label>
        <label className="label-error">{resp}</label>

      </div>
      {usuario== null ?
        <button onClick={logar}>Entrar</button> : ''}
      <button onClick={logout}>Sair</button>
    </Main>

  )
}

export default Login;