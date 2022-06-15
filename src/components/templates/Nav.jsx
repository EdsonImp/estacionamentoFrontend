import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'


export default props =>
<aside className="menu-area">
    <nav className="menu">
    <Link to="/Login">
        <i className='fa fa-sign-in'></i> Login
    </Link>
    <Link to="/">
        <i className='fa fa-car'></i> Início
    </Link>
    <Link to="/users">
        <i className='fa fa-users'></i> Usuários
    </Link>
    </nav>
</aside>