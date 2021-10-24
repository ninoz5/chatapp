import React from 'react'
import './Message.css'
import {useState} from 'react'
import { getDatabase, ref, set } from "firebase/database";
function Message(props){
	const [display,setDisplay] = useState('none')
	
	function UserColor(){
		var randomColor = Math.floor(Math.random()*16777215).toString(16);
		randomColor = '#' + randomColor;
		return randomColor
	}
	function addFriend(){
		const db = getDatabase();
		set(ref(db, '/users/' + sessionStorage.getItem('user') + '/contacts/' + props.user),0);
		setDisplay('none')
	}
	function showAdd(){
		if(display !== ''){
			setDisplay('')
		}else{
			setDisplay('none')
		}

	}
	var user = sessionStorage.getItem('user')
	var className;
	var color;
	var bgcolor = '';
	var name;
	var showUser = ''
	var publicUser = ''
	if (user === props.user){
		className = 'me'
		name = 'Me'
		if(localStorage.getItem('chatcolor') !== null)
			bgcolor = localStorage.getItem('chatcolor')
		showUser = <div className = 'me'  ><label style = {{'backgroundColor': bgcolor}}className = 'mybubble'> {props.message}</label> </div>
	}else{
		className = 'them'
		name = props.user
		if (localStorage.getItem(props.user) === null){
			localStorage.setItem(props.user, UserColor())
		}
		color = localStorage.getItem(props.user)
		if(props.private === 'false'){
		publicUser = <React.Fragment><label onClick = {() =>showAdd()} className = 'theirname' style={{"color": color }} > {name} : </label> <br/></React.Fragment>
		}
		showUser = 
		<div>

		<button onClick = {() =>addFriend()} className = 'add' style={{"display": display }}>Add as friend? </button>
		<fieldset  className = {className}>
		<label onClick = {() =>showAdd()} className = 'theirname' style={{"color": color }} > {publicUser} </label> 
		<label className = 'bubble'> {props.message}</label>
		</fieldset>
		</div>

	}

	if (props.same === true)
		showUser = ''

	return(
		<div >

		{showUser}


		</div>

		)
}

export default Message;