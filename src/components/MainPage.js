import React, { Component } from 'react';
import Userauth from './userauth/Userauth'
import Home from './home/Home'
class MainPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			user:sessionStorage.getItem('user') == null?false:true,
		}
	}
	submit= (user) =>{
		this.setState({
			user:user
		})
		
	}

	
	render() {
		
		
		return (
			this.state.user ?
			<div>
			<Home />
			</div> 
			:
			<Userauth submit = {this.submit} />
			);
	}
}
export default MainPage;