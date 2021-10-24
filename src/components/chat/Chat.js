import React, { Component } from 'react';
import { getDatabase, ref, onValue} from "firebase/database";
import {Link} from 'react-router-dom'
import {FiSettings,FiArrowLeft} from 'react-icons/fi'
import Message from './Message'
import SendChat from './SendChat'
import Header from '../header/Header'
import './Chat.css'
import ScrollIntoView from 'react-scroll-into-view'
export class Chat extends Component {
	
	constructor(props){

		super(props);
		this.state = {chat:[], chatname : this.props.match.params.name, private: this.props.match.params.private}
		this.scroll = React.createRef();
	}	

		
	componentDidMount(){
		var reference;
		if(this.state.private === 'true'){
			reference = 'users/' + sessionStorage.getItem('user') + '/chats/' + this.state.chatname
		}else{
			reference = 'chat/' +  this.state.chatname
		}
		const dbRef = getDatabase();
		const dummy = ref(dbRef, reference);
		var data;
		onValue(dummy, (snapshot) => {
			data = snapshot.val();
			if(data !== null){
			this.setState({chat:data})
			}
		});	ScrollIntoView(({
   selector : '#bottom',
}))

			
	}


	render() {

		var chatname =this.props.match.params.name
		const topRight = <Link to="/Settings" className = 'settings'> <FiSettings/></Link>
		const topLeft = <Link to="/" className = 'back'> <FiArrowLeft/></Link>
		if (this.state.chat != null){
			return (

				<div className = 'chat'>
				{/*<ScrollIntoView selector = '#bottom'>
				  <button className="mdl-button mdl-js-button mdl-button--raised">
    				Jump to bottom
 				 </button>
				</ScrollIntoView>*/}
				<Header className = 'header' name = {chatname} topLeft = {topLeft} topRight = {topRight}/>
				<div className = 'chatarea' >
				
				{this.state.chat.map((item,i) => 
					<Message  key = {i} user = {item[0]} message = {item[1]} topRight = {topRight} private = {this.state.private}/> )}
				<div id= 'bottom'> </div>
				</div>

				<div  className = 'sendchat'>
				<SendChat  ref = {this.scroll} user = {sessionStorage.getItem('user')}  chat = {this.state.chat} name = {chatname} private = {this.state.private}/>
				</div>
				 
				</div>
				)
		}
		else{
			return (
				<div>
				<Header name = {chatname} topLeft = {topLeft} topRight = {topRight}/>
				<div className = 'space' > </div> 
				<div className = 'loading'>
				Loading...
				</div>
				<div className = 'space' > </div> 
				</div>
				);}
		}
	}
	export default Chat;