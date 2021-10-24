import React, { Component } from 'react';
import './ChangeChatColor.css'
class ChangeChatColor extends Component {
	constructor(props){
		super(props)
		this.state = {
			color:'#2ebf2e', colorDisplay:'none'
		}
	}
	handleChangeColor = (event) => {
		this.setState({color: event.target.value})
	}
	resetColor(){
		this.setState({color:'#2ebf2e'})
	}
	saveColor(){
		localStorage.setItem("chatcolor", this.state.color)
	}
	showChangeColor(){
		if(this.state.colorDisplay === 'none'){
			this.setState({colorDisplay: ''})
		}else{
			this.setState({colorDisplay: 'none'})
		}
	}
	render() {
		const {color,colorDisplay} = this.state
		return (
			<React.Fragment >
			<button onClick = {() => this.showChangeColor()}className = 'settingsButtons' >Chat settings </button><br/>
			
			<div className ='changecolor' style={{"display": colorDisplay }}>
			<label className = 'choosetext'>Choose the color of your chat bubble! (The text is white so be careful) </label>
			<input className = 'colorbutton'  type =  'color' value = {color} onChange = {this.handleChangeColor} />
			<button className = 'colorbutton' onClick = {() => this.saveColor()}> Save </button> 
			<button className = 'colorbutton' onClick = {() => this.resetColor()}> Reset </button> 
			
			</div>
			</React.Fragment>
			);
	}
}
export default ChangeChatColor
