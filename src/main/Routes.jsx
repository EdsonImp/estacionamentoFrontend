import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login/Login'
import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'


export default props =>(
    
<Routes>
    <Route exact path="/"  element = { <Home/> } />
    <Route path="/users" element = { <UserCrud/> } />
    <Route path="*" element = {<Home/>} />
    <Route exact path="/Login"  element = { <Login/> } />
</Routes>
)


