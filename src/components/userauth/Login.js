import React, { Component } from 'react';
import { getDatabase, ref, set, onValue } from "firebase/database";
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';
class Login extends Component {
	constructor(props){
 		super(props)
 		this.state = {
 			username : '', password : ''
 		}
 	}

 	handleUsernameChange = (event) => {
 		this.setState({username: event.target.value})
 		
 	}
 	handlePasswordChange = (event) => {
 		this.setState({password: event.target.value})
 	}
 
 	handleSubmit = (event) => {
 		
 		event.preventDefault()
 		const db = getDatabase();
 		const dummy = ref(db, 'users/' + this.state.username);
		
		onValue(dummy, (snapshot) => {
			if (snapshot.exists()){
				var data = snapshot.val()
				if(bcrypt.compareSync(this.state.password,data['password'] )){
					
					this.submit(data,db)
					
				}else{
					alert('Wrong username or password')
				}
			}else{
				alert('Wrong username or password')
			}
		})
			
 	}
 	submit(data,db){
 			var user = this.state.username
 			delete data['password']
 			data['user'] = user 
 			var key = uuidv4();
 			var hashed = bcrypt.hashSync(key,1)
			set(ref(db, 'sessions/' + user), {
					key: hashed,
				});
			
			sessionStorage.setItem('userinfo', JSON.stringify(data))
			sessionStorage.setItem('user', user)
			sessionStorage.setItem('session', JSON.stringify([user,hashed])) 
			this.props.submit(user,hashed)

	}
 	toRegister(){
 		this.props.login(false)
 	}
	render() {
	
			const {username, password} = this.state
		
			
		return (
			<div >

			<div className = 'space'> </div>
			 <label className = 'header' >FacelessBook </label> 
			<form onSubmit = {this.handleSubmit}>
			<div className = 'userEnter'>
			<div className = 'container'>
			
			
			<fieldset >
			<label className = 'labels'> Username:</label>
			<input className = 'userInput' required type ='text' value = {username} onChange = {this.handleUsernameChange} />
			</fieldset>
					
			
			 <fieldset >
			 <label className = 'labels'> Password: </label>
			<input className = 'userInput'required id="password" type = 'password' value = {password} onChange = {this.handlePasswordChange} />
			</fieldset>
			
			
			<button id= 'submit' className= 'userEnter' type = 'submit'> Login </button> <br/>
			<small id = 'small'> Don't have an account? <button className = 'ref' onClick = {() => this.toRegister()}>  Register! </button></small>
			</div>
			</div>
			</form>
			
			</div>
			
		);
	}
}
 export default Login;