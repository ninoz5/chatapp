import React from 'react';
import {Link} from "react-router-dom";
import './MinimizedChat.css'
function MinimizedChat(props) {
	const chat = {
		pathname: '/Chat/' + props.ChatName + '/' + props.private,
	}
	
	
		return (
			
			
			<div >
			<Link to={chat} className = 'name'> <div className='link'><label className = 'text' >{props.ChatName}</label></div></Link>
			
			
			</div>
		);
	
}
export default MinimizedChat;