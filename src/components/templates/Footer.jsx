import './Footer.css'
import React from 'react'
import useAuth from '../Login/UseAUth'

export default props => {
const {user} = useAuth();
const usuario = user.name;

   return(
<footer className="footer">
   Copiright 2022 by E S Silva
  
</footer>)}