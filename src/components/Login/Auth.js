import { createContext, useEffect, useState } from "react";
import base64 from 'base-64'
//compoennte de autenticação
//esse contexto será usando por todas as rotas, para pegar o estado do user
//Esse element oé um contexto, que precisa ser passado par todos, no app como autocontext.provider
export const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({name:''});
  const [resp, setResp] = useState('')
  const [usuario, setUsuario] = useState()
  const [userLogado, setUserlogado] = useState()

//Método para pegar o nome correto do usuario para usar acomo logado
  const findByEmail =(usuario)=>{
    const url = `http://localhost:8080/users/findbylogin/${usuario}`
    const token = localStorage.getItem('token')
    const requestInfo = {
        method: 'GET',
        headers: new Headers({ 'Authorization': 'Bearer ' + (token) }),
        'Content-Type': 'application/json'
    }
    fetch(url, requestInfo).
    then((response) => response.json()).then((response)=> setUserlogado(response.name))
    return;
  }
  
 
 
  const signin = (email, password) =>   {
    
    //dados para autenticar o aplicativo
    let usern='userdoApp'
    let passw='senhadoApp'
    const data = {'Content-Type':'application/x-www-form-urlencoded'};
    const requestInfo = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({'Authorization': 'Basic ' + base64.encode(usern + ":" + passw),
            'Content-Type': 'application/json' })}
           
            fetch(`http://localhost:8080/oauth/token?username=${email}&password=${password}&grant_type=password`, requestInfo)
            .then(response => {
                if(response.ok) {
                  setResp('')
                                    return response.json()
                }
                throw new Error("=Verifique email e senha=");
                
              })
              .then(token => {
                setUsuario(email);
                localStorage.setItem('token', token.access_token);
                findByEmail(email);
               
              return;
          })
          .catch(e => {
            setResp(e.message)
             
          }); 

   setTimeout(() => {
    if(localStorage.getItem("token")){
        //setUser({name:localStorage.getItem('usuario')}) //deu certo nao retorna nada para o res
       } else {
        return "E-mail ou senha incorretos";
      }
   }, 2000);
   
     
    }
 
//metodo de logout, remove o token e o tira o user do state
  const signout = () => {
      
    setUser({name:''});
    localStorage.removeItem('token');
    setUsuario(null);
    localStorage.removeItem('username');
    setUserlogado(null);
  };

  //cria um componente que prover o contexto automaticamente, sera passado para o app, para que todos usem
  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, resp, usuario, signin, signout,userLogado }}
    >
      {children}
    </AuthContext.Provider>
  );
};