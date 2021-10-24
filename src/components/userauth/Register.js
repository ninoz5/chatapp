import React, { Component } from 'react';
import { getDatabase, ref, set, onValue } from "firebase/database";
import bcrypt from 'bcryptjs'
class Register extends Component {
	constructor(props){
		super(props)
		this.state = {
			username : '', password : '', confirm: '', email: ''
		}
		this.cpwRef = React.createRef();
		this.db = getDatabase();
		this.user = React.createRef();
	}

	handleUsernameChange = (event) => {
		this.setState({username: event.target.value}, () => {this.usernameExists(event)})
	}
	handlePasswordChange = (event) => {
		this.setState({password: event.target.value},() => {this.passwordsMatch(event)})
	}
	handleConfirmPasswordChange = (event) => {
		this.setState({confirm: event.target.value},() => {this.passwordsMatch(event)})	
	}
	handleEmailChange = (event) => {
		this.setState({email: event.target.value})
	}
	handleSubmit = (event) => {
		if(!this.passwordsMatch()){

		event.preventDefault()
		const db = this.db
		set(ref(db, 'users/' + this.state.username), {
			email: this.state.email,
			password: bcrypt.hashSync(this.state.password,1),
			contacts: {},
			picture: 'https://robohash.org/' + this.state.username
		});
		this.toLogin()	
		}
	}
	passwordsMatch(event){
		if(this.state.password !== this.state.confirm){
			this.cpwRef.current.setCustomValidity("Passwords don't match");
		} else {
			this.cpwRef.current.setCustomValidity('');
		}		
	}
	usernameExists(event){
		const db = this.db
		const dummy = ref(db, 'users/' + this.state.username);
		onValue(dummy, (snapshot) => {
			if (snapshot.exists()){
				this.user.current.setCustomValidity('Username already exists')
				return true
			}else{
				this.user.current.setCustomValidity('')
				return false
			}
		})
	}
	toLogin(){

		this.props.login(true)

	}
	render() {
		const {username, password,email,confirm} = this.state
		return (
			<div>
			<form onSubmit = {this.handleSubmit}>
			<label className = 'header' >FacelessBook</label> 
			<div className = 'userEnter'>
			<div class = 'container'> 
			
			<fieldset >
			<label className = 'labels' > Username: </label>
			<input required className = 'userInput'  type ='text' ref = {this.user} value = {username} onChange = {this.handleUsernameChange} />
			</fieldset>		
			
			
			
			<fieldset >
			<label className = 'labels' > Password: </label>
			<input required className = 'userInput' id="password" type = 'password' value = {password} onChange = {this.handlePasswordChange} />
			</fieldset>
			
			
			
			<fieldset>
			<label className = 'labels'> Confirm Pw: </label>
			<input required className = 'userInput'  ref={this.cpwRef}  id="confirm_password"type = 'password' value = {confirm} onChange = {this.handleConfirmPasswordChange} />
			</fieldset>
			
			
			
			
			<fieldset>
			<label className = 'labels'> Email: </label> 
			<input  required className = 'userInput' type = 'email' value = {email} onChange = {this.handleEmailChange}/> 
			</fieldset>
			
			 
			<button id ='submit' className = 'userEnter' type = 'submit'> Register </button><br/>
			<small id= 'small'> Already have an account? <br/> <button className = 'ref' onClick = {() => this.toLogin()}> Log in! </button></small>
			</div>
			</div >
			</form>
			
			</div>
			);
	}
}
export default Register;