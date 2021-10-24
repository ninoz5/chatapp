import React, { useState } from "react";
import { getDatabase, ref, set} from "firebase/database";
import './SendChat.css'
function SendChat(props){
	const [msg, setMsg] = useState('')
	const chatname = props.name
	function onEnter(e){
		if(e.key ==='Enter'){
			sendMessage()
		}
	}	
	function onClick(){
		sendMessage()
	}

	function sendMessage(db){
		if(msg !== ''){
			const db = getDatabase();
			let oldchat =props.chat
			if (oldchat.length >20){
				oldchat.splice(0,1);
			}
				oldchat.push([props.user,msg])
				if(props.private === 'true'){
					set(ref(db, '/users/' + sessionStorage.getItem('user')+'/chats/' + chatname), oldchat);
					set(ref(db, '/users/' + chatname +'/chats/' +sessionStorage.getItem('user')), oldchat);
					setMsg('')
				}else{
					set(ref(db, '/chat/' + chatname), oldchat);
					setMsg('')
				}
		}	
	}
	// function onSend(){
	// 	const db = getDatabase();
	// 	checkSession(props.user,db,sendMessage(db))
	// }
	return(
		<div className = 'send'>
		<input placeholder = 'Type a message...' value = {msg} onKeyPress={onEnter} className = 'input' onChange={event => setMsg(event.target.value)} /> 
		<button className = 'messageSend' onClick = {onClick}> Send </button>
		</div>

		)
}

export default SendChat;