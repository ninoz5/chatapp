import React, { Component } from 'react';
import { getDatabase, set,ref, } from "firebase/database";
import './ChangeProfilePicture.css'
class ChangeProfilePicture extends Component {
	constructor(props){
		super(props)
		this.state = ({
			change: '', style: '', display:'none'
		})
	}
	savePic(){
		if(this.state.change !== ''){
			const db = getDatabase();
			set(ref(db, '/users/' + sessionStorage.getItem('user') + '/picture'), this.state.picture);
			this.setState({display:'none'})
		}

	}
	previewPic(){
		if(this.state.change !== ''){
			var style;
			if(this.state.style !== 1){
				style = '?set=set' + this.state.style
			}
			var url = 'https://robohash.org/' + this.state.change + style
			this.setState({picture:url})
			this.props.preview(url)
		}

	}
	showChangePic(){
		if(this.state.display === 'none'){
			this.setState({display: ''})
		}else{
			this.setState({display: 'none'})
		}

	}
	handleChangeStyle = (event) => {
		this.setState({style: event.target.value})
	}
	handleChange = (event) => {
		this.setState({change: event.target.value})

	}
	render() {
		const {style,change,display} = this.state
		return (
			<React.Fragment> 
			<button className = 'settingsButtons' onClick = {() => this.showChangePic()}>Change profile picture</button>
			<div className= 'changepic'style={{"display": display }} >
			<input className= 'robothash' type = 'text'placeholder = 'Type anything to generate a new pic' value = {change} onChange = {this.handleChange} /> 
			<select value = {style} onChange = {this.handleChangeStyle} >
			<option value = '1' > Basic </option> 
			<option value = '2'> Weird </option> 
			<option value = '3'> Head </option> 
			<option value = '4'> Cat </option>
			</select> 
			<button className = 'picbutton' onClick = {() =>this.savePic()}>Save</button>
			<button className = 'picbutton' onClick = {() =>this.previewPic()}>Preview</button>
			<br/>
			</div>
			</React.Fragment> 
			);
	}
}
export default ChangeProfilePicture;
