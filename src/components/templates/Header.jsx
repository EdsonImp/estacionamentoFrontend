import './Header.css'
//import {useEffect, useState } from "react"

import useAuth from "../Login/UseAUth";


export default props => {
   
  const {usuario,userLogado} = useAuth();
 
 

  return (

    <header className="header d-none d-sm-flex flex-column">
      {
        usuario !== '' ? ( //se tiver algum usuario conectado ele aparecera no cabeçalho
          <div className="login"> <div className='status' > <i class=" fa fa-user " aria-hidden="true"  > -</i>{userLogado} </div></div>
        ) : ''
      }
      <h1 className="mt-3 ">
        <i className={`fa fa-${props.icon}`}></i> {props.title}
      </h1>


      <p className="lead text-muted">{props.subtitle}</p>
    </header>
  )
}

