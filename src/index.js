import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import './index.css';
import App from './App';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var config = {
    apiKey: "AIzaSyB1c2AlcwQylJQGf4Wu3X5ZnsCWrJQll6o",
    authDomain: "friend-schedule.firebaseapp.com",
    databaseURL: "https://friend-schedule.firebaseio.com",
    projectId: "friend-schedule",
    storageBucket: "friend-schedule.appspot.com",
    messagingSenderId: "519936192617"
};
firebase.initializeApp(config);
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
