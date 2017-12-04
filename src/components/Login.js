import React, { Component } from 'react';
import firebase from 'firebase/app';

export default class Login extends Component {
    loginClick(){
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('user_friends');
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(token, user)
            window.FB.api(
                '/me/friends',
                'GET',
                {
                    access_token:token,
                    scope:'user_friends'
                },
                function(response) {
                    console.log(response);
                }
              );
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }
    render(){
        return(
            <button onClick={() => this.loginClick()}> Login </button>
        );
    }
}