import React, { Component } from 'react';
import { getDatabase, ref, onValue,set} from "firebase/database";
import {Link} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import Header from '../header/Header.js'
import './Contacts.css'
 class Contacts extends Component {
 	constructor(props){
 		super(props)
 		this.state = {
 			contacts: null
 		}
 		
		
 	}
 	componentDidMount(props){
		const db = getDatabase()
		const dummy = ref(db, 'users/' +  this.props.match.params.name + "/contacts");
		onValue(dummy, (snapshot) => {
			var contacts = snapshot.val()
			if(contacts !== null && contacts !== undefined){
			var array = Object.entries(contacts).map(([key]) => key)
			this.setState({contacts: array})
			}else{
				this.setState({contacts: []})
			}
		});	
	}
	deleteContact(event){
		const db = getDatabase()
		
		set(ref(db, 'users/' +sessionStorage.getItem('user')+ '/contacts/' +event.target.id), null);
	}

	render() {
		
		const topLeft = <Link to="/Settings" className = 'back'> <FiArrowLeft/></Link>
		if(this.state.contacts !== null){
		return (
			<div>
			<div>
			<Header name = 'Contacts' topLeft = {topLeft}/>
			
			</div>
			<div className = 'contacts'>
			<label> Press on a contact to message them! </label>
			{this.state.contacts.map((item,i) => 
				<div className = 'contactspace'>
					 <button className= 'X' key = {i + "button"} id = {item} onClick = {this.deleteContact}> X </button> 
					<Link to= {'/Chat/' + item + '/true'} key = {i + 'link'} className = 'contactName'>
					<div key = {i + 'div'}  > 
					<label className = 'contact' key = {i} > {item} </label>
					 </div>
					 </Link>
					
					 
					</div> 
					  )}
			</div>
			<Link className = 'addpeoplelink' to= {'/AddPeople'} ><button className = 'addpeople'> Add People! </button> </Link>
			</div>
		)}else{
			return(

				<div>
				<Header name = 'Contacts' topLeft = {topLeft}/>
				<div className = 'space' > </div> 
				<div className = 'loading'>
				Loading...
				</div>
				<div className = 'space' > </div> 
				</div>
			)
		}
	}
}
export default Contacts;
