import React, { useState } from 'react'
import Main from '../templates/Main'
import './UserCrud.css'
import useAuth from "../Login/UseAUth";



export default () => {
    const [list, setList] = useState([]);
    const [header, setHeader] = useState([])
    const [cadastro, setCadastro] = useState(false)
    const [nameCad, setName] = useState()
    const [emailCad, setEmail] = useState()
    const [passwordCad, setPassword] = useState()
    const [role,setRole] = useState(1)
    const [errorCad, setErrorcad] = useState()
    //const [userSelected, setUserselected] = useState()
    const [fechaCadastro, setFechacadastro] = useState(true)

    const{userLogado} = useAuth()
    
    const headerProps = {
        icon: 'users',
        title: 'Usuários',
        subtitle: 'Cadastro de usuários: Incluir, Listar e Excluir!'
    }

    const url = "http://localhost:8080"
    const token = localStorage.getItem('token')
    const requestInfo = {
        method: 'GET',
        headers: new Headers({ 'Authorization': 'Bearer ' + (token) }),
        'Content-Type': 'application/json'
    }

    

const requestInfCad ={
    method: 'POST',
    body: JSON.stringify({'name':nameCad,'email':emailCad,'password':passwordCad, 'roles':[{id:role}]}),
    headers: new Headers({ 'Authorization': 'Bearer ' + (token),'Content-Type': 'application/json'})
   
}
//método para novo usuario
const cadNovoUser= () =>{
    
    if (!nameCad | !emailCad | !passwordCad) { //verifica se foi digitado algo nos campos
        setErrorcad("Preencha todos os campos");}
    fetch(`${url}/users/novousuario`, requestInfCad).
    then((response) => console.log(response))
}

const del = (id) => {
       const request ={
        method: 'DELETE',
        headers: new Headers({ 'Authorization': 'Bearer ' + (token),'Content-Type': 'application/json'})
       
    }
    fetch(`${url}/users/delete/${id}`, request)
//console.log(id)
}


   //observe que precisei mapear o response para apenas os objetos que precisarei
  
   const buscauser = () => {

        fetch(`${url}/users`, requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            }).then(response => {response.map((item)=>{
                return [item.name, item.email, item.id] })
                setList(response)
            })
           setHeader(["ID","NOME","E-MAIL","Apagar?"])
    }

//Cria formulario de novo usuario

const novoUser=()=>{
    setFechacadastro(true)
    setCadastro() ? setCadastro(false) : setCadastro(true)
       
   }
function renderFormCadUser(){
    if(userLogado && fechaCadastro){
    return(
        
    <div className='cadastro'>

        {cadastro==true? 
            <>
            
            <div className='label'><label>Cadastrar novo usuário</label> <button className='btn-fechar' onClick={(e)=>setFechacadastro(false)}>x</button></div>
            <input type="text" placeholder='Digine o nome' onChange={(e)=>  [setName(e.target.value)]}/>
            <input type="text" placeholder='Digine o email' onChange={(e)=>  [setEmail(e.target.value)]}/>
            <input type="password" placeholder='Digine a senha' onChange={(e)=>  [setPassword(e.target.value)]}/>
            <label htmlFor="">Escolha um tipo de usuário</label>
            
            <select id="selector" onChange={e=> setRole(e.target.value)}>
              <option value="1" selected>Usuario</option>

               <option value="2" >Admin</option>
              </select> 
             <p className='erro'>{errorCad}</p>

              <button onClick={cadNovoUser}>Cadastrar</button>
              
              
              
            </>
            : ""
            
        }
        
        </div>
    )
}}

 //Cria tabela de usuarios
    function renderTable() {
        return (

            <table className='tabelaUser' >
                <thead className='headerTable'>
                    <tr>
                        <th className='th-1'>{header[0]}</th>
                        <th className='th-2'>{header[1]}</th>
                        <th className='th-3'>{header[2]}</th>
                        <th className='th-4'>{header[3]}</th>
                    </tr>
                </thead>
                <tbody className='t-body'>{renderRows()}</tbody>
            </table>
            )
    }

    function  renderRows() {
        return list.map(lis=> {
            return ( 
                <tr className='tr-ros' key={lis.id}>
                    <td>{lis.id}</td>
                    <td>{lis.name}</td>
                    <td>{lis.email}</td>
                    <td><button onClick={() => del(lis.id)}><i className='fa fa-trash'></i></button></td>
                    </tr>
                    )
})}

    return (
        <Main {...headerProps}>
            <button className='btn-buscar' onClick={buscauser}>Listar Usuários</button>
            <button className='btn-buscar' onClick={novoUser}>novo</button>
            
            {renderTable()}
            {renderFormCadUser()}           
            
                       
        </Main>
    )
}

