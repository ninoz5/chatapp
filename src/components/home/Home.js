import React, { Component } from 'react';
import { getDatabase, ref, onValue} from "firebase/database";
import {Link} from 'react-router-dom'
import {FiSettings} from 'react-icons/fi'
import './Home.css'
import MinimizedChat from './MinimizedChat'
import Header from '../header/Header'
export class Home extends Component {
	constructor(props){
		super(props)
		this.state= {chat:[], pv:[] ,displayPrivate:'none', displayPublic: ''}

		
	}
	componentDidMount(){
		const dbRef = getDatabase();
		var dummy = ref(dbRef, 'chat/');
		var data;
		onValue(dummy, (snapshot) => {
			data = snapshot.val();
			if(data !== null){
			var array = Object.entries(data).map(([key]) => key)
			this.setState({chat: array})
			}
		});	
		 dummy = ref(dbRef, 'users/' + sessionStorage.getItem('user') + '/chats/');
		onValue(dummy, (snapshot) => {
			data = snapshot.val();
			if(data !== null){
			var array = Object.entries(data).map(([key]) => key)
			this.setState({pv: array})
			}
		});	

 }

	render() {
		const {chat,displayPrivate,displayPublic,pv} = this.state
		const topRight = <Link to="/Settings" className = 'settings'> <FiSettings/></Link>
			return (
				<div>
				<Header name = 'Chats' topRight = {topRight}/>
				<div className = 'privacy'>
				<button onClick = {()=> this.setState({displayPrivate:'none',displayPublic:''})} className = 'public'> Public Chats </button> 
				<button onClick = {()=> this.setState({displayPrivate:'',displayPublic:'none'})}className = 'private'> Private Chats </button> 
				</div>
				<div className = 'rooms' style={{"display": displayPublic }}>
				{chat.map((item,i) => 
					<MinimizedChat  key = {i}  ChatName = {item} private ='false'/> )}
				Press on someone's name to add them!
				</div>
				<div className = 'rooms' style={{"display": displayPrivate}}>
					{pv.map((item,i) => 
					<MinimizedChat  key = {i}  ChatName = {item} private ='true'/> )}
				</div>
				</div>
			)
		}	
}
export default Home;
