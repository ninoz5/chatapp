import React, { Component } from 'react';
import Register from './Register'
import Login from './Login'
import './Userauth.css'
 class Userauth extends Component {
	constructor(props){
		super(props)
		this.state = {
			login:true
		}
	}
	login= (bool) =>{
		this.setState({
			login:bool
		})
		
	}
	submit = (bool) =>{
		this.props.submit(bool)
	}
	render() {
		return (
			this.state.login?
			<div className = 'UserAuth'>
				<Login login = {this.login} submit = {this.submit}/>
			</div>:
			<div className = 'UserAuth'>
				<Register login = {this.login}/>
			</div>
		);
	}
}

export default Userauth;
