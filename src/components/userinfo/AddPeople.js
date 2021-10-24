import React, { Component } from 'react';
import { getDatabase, ref, onValue,set} from "firebase/database";
import {Link} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import Header from '../header/Header.js'
import './Contacts.css'
 class AddPeople extends Component {
 	constructor(props){
 		super(props)
 		this.state = {
 			people: [], contacts:[]
 		}
 		
		
 	}
 	componentDidMount(props){
		const db = getDatabase()
		var dummy = ref(db, 'users/');
		onValue(dummy, (snapshot) => {
			var people = snapshot.val()
			if([people!== null]){
			var array = Object.entries(people).map(([key]) => key)
			array.pop(sessionStorage.getItem('user'))
			var index = array.indexOf(sessionStorage.getItem('user'))
			delete array[index]
			this.setState({people: array})
			}
		});	
		dummy = ref(db, 'users/' + sessionStorage.getItem('user') + '/contacts');
		onValue(dummy, (snapshot) => {
			var contacts = snapshot.val()
			if([contacts!== null]){
			var array = Object.entries(contacts).map(([key]) => key)
			var index = array.indexOf(sessionStorage.getItem('user'))
			delete array[index]
			this.setState({contacts: array})
			}
		});	

	}
	addContact(event){
		const db = getDatabase();
		console.log('/users/' + sessionStorage.getItem('user') + '/contacts/' + event.target.id)
		set(ref(db, '/users/' + sessionStorage.getItem('user') + '/contacts/' + event.target.id),0);
	}
	checkContact(item,i){
		if(this.state.contacts.includes(item)){
			return (<label>Already your contact!</label>)
		}else{
			return( <button className= '+' key = {i + "button"} id = {item} onClick = {this.addContact}> + </button> )
		}
	}

	render() {
		
		const topLeft = <Link to={'Contacts/' + sessionStorage.getItem('user')} className = 'back'> <FiArrowLeft/></Link>
		if(this.state.people !== []){
		return (
			<div>
			<div>
			<Header name = 'People' topLeft = {topLeft}/>
			
			</div>
			<div>
			<label>Click on + to add someone!
			 </label>
			{this.state.people.map((item,i) => 
	
					<div key = {i + 'div'} className = 'contactspace' > 
					<label className = 'contact' key = {i} > {item} </label>
					{this.checkContact(item)}
					 </div>
					  )}
			</div>
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
export default AddPeople;
