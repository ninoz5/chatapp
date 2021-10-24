
import './App.css';
import MainPage from './components/MainPage'
import React from "react";
import {Route} from 'react-router-dom'
import Settings from './components/userinfo/Settings'
import Chat from './components/chat/Chat'
import Contacts from './components/userinfo/Contacts'
import AddPeople from './components/userinfo/AddPeople'
import AccountDetails from './components/userinfo/AccountDetails'
function App() {
   
  return (

   
    <div className="App">

      <Route exact path = '/' component = {MainPage}/>
      <Route exact path = '/Contacts/:name' component = {Contacts}/>
      <Route exact path = '/AccountDetails/:name' component = {AccountDetails}/>
       <Route exact path = '/Settings' component = {Settings}/>
        <Route exact path = '/AddPeople' component = {AddPeople}/>
       <Route exact path = '/Chat/:name/:private' component = {Chat} />
    
    </div> 

    
  );
}

export default App;
