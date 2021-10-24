import React from 'react'
import './Header.css'

function Header(props){
	
	return(

   <div className = 'header'>  
   {props.topLeft}
   <label className = 'title'>{props.name}</label>
   {props.topRight}
   </div>

   )
}

export default Header;