import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import { AuthProvider } from "../components/Login/Auth" ;
import React from 'react'
import { BrowserRouter } from 'react-router-dom'


import Logo from '../components/templates/Logo'
import Nav from '../components/templates/Nav'
import Routes from './Routes'
import Footer from '../components/templates/Footer'

//abaixo o autoprovider prover os contextos
export default props =>
<AuthProvider> 
<BrowserRouter>
<div className="app">
    <Logo />
    <Nav />
    <Routes />
    <Footer />
</div>
</BrowserRouter>
</AuthProvider>