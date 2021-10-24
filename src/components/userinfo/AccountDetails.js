import React, { Component } from 'react';
import { getDatabase, ref, onValue} from "firebase/database";
import {Link} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import Header from '../header/Header.js'
import './Contacts.css'
 class AccountDetails extends Component {
 	constructor(props){
 		super(props)
 		this.state = {
 			username: '',email:'',
 		}
 		
		
 	}
 	componentDidMount(props){
 		var user = this.props.match.params.name
		const db = getDatabase()
		const dummy = ref(db, 'users/' + user );
		onValue(dummy, (snapshot) => {
			var details = snapshot.val()
			this.setState({username: user,
							email:details.email,
							})
		});	
	}

	render() {
		const topLeft = <Link to="/Settings" className = 'back'> <FiArrowLeft/></Link>
		const {username,email} = this.state
		if(username !== ''){
		return (
			<div>
			<div>
			<Header name = 'Account Details' topLeft = {topLeft}/>
			</div>
			<div>
			<div className = 'contactspace' > <label className = 'contact'  >Username : </label> <label className = 'contact'>{username}  </label></div>
			<div className = 'contactspace' > <label className = 'contact'  >Email : </label><label className = 'contact'> {email} </label> </div>
			</div>
			</div>
		)
	}else{
			return(

				<div>
				<Header name = 'Contacts' topLeft = {topLeft}/>
				<div className = 'space' > </div> 
				<div className = 'loading'>
				Loading...
				<label> {this.state.username}</label>
				</div>
				<div className = 'space' > </div> 
				</div>
			)
		}
	}
}
export default AccountDetails;
