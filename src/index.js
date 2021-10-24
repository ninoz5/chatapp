import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import firebase
import { initializeApp } from 'firebase/app'
import {BrowserRouter} from 'react-router-dom'

//paste firebase config value
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXWZLkY4qgMKu9tUr2bryEVAwNrw23fQ0",
  authDomain: "chatapp-e21fa.firebaseapp.com",
  databaseURL: "https://chatapp-e21fa-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatapp-e21fa",
  storageBucket: "chatapp-e21fa.appspot.com",
  messagingSenderId: "1021888070436",
  appId: "1:1021888070436:web:efc35f785770f7148fa9b1",
  measurementId: "G-QGJZPG5XPJ"
};

//initialize firebase
initializeApp(firebaseConfig)
ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter >
    <App />
    </BrowserRouter >
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
