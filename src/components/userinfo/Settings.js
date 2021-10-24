import React, {Component} from 'react'
import { getDatabase, ref, child,remove, onValue} from "firebase/database";
import Header from '../header/Header'
import {Link} from 'react-router-dom'
import {FiArrowLeft,FiLinkedin} from 'react-icons/fi'
import './Settings.css'
import ChangeProfilePicture from './ChangeProfilePicture'
import ChangeChatColor from './ChangeChatColor'
export class Settings extends Component {
	constructor(props){
		super(props)
		this.state = {
			picture:''
		}
	}
	componentDidMount(){
		const dbRef = getDatabase();
		const dummy = ref(dbRef, 'users/' +  sessionStorage.getItem('user') + '/picture');
		var data;
		onValue(dummy, (snapshot) => {
			data = snapshot.val();
			this.setState({picture:data})
		});	
	}
	Logout(){
		const db = ref(getDatabase());
		remove(child(db, 'sessions/' + sessionStorage.getItem('user')))
		sessionStorage.clear()
		
	}

	preview = (picture) =>{
		this.setState({picture:picture})
	}
	render(){	
		const {picture} = this.state
		const topRight = <a href='https://www.linkedin.com/in/anis-zoghbi-4b581b1b8/' className = 'settings'> <FiLinkedin/></a>
		const topLeft = <Link to="/" className = 'back'> <FiArrowLeft/></Link>
		const contacts = {
			pathname: '/Contacts/' + sessionStorage.getItem('user')
		}
		const account = {
			pathname:'/AccountDetails/' + sessionStorage.getItem('user')
		}
		return(

			<div className = "settings2">
			<Header name = {sessionStorage.getItem('user')} topLeft = {topLeft} topRight = {topRight}/>
			<div className = 'img'>
			<img alt = 'Click on change your profile pic' src = {picture} />
			</div>
			<div className = 'allbutimg'>
			<ChangeProfilePicture preview = {this.preview}/>
			<ChangeChatColor />
			<Link to={account} ><button className = 'settingsButtons'>Account Details</button></Link>
			<Link to={contacts} ><button className = 'settingsButtons'>Contacts</button></Link>
			<Link to="/"><button className = 'settingsButtons' id= 'logout' onClick = {this.Logout}>Logout</button></Link>
			</div>
			</div>

			)
	}
}
export default Settings;