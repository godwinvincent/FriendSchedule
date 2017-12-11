import React, { Component } from 'react';
import firebase from 'firebase/app';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
    loginPage : {
        width: 360,
        padding: '8% 0 0',
        margin: 'auto',
        marginTop: '100px',
      },
      form : {
        position: 'relative',
        zIndex: 1,
        background: '#FFFFFF',
        maxWidth: 360,
        margin: '0 auto 100px',
        padding: 45,
        textAlign: 'center',
        boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)'
      },
    input : {
        fontFamily: '"Roboto", sans-serif',
        outline: 0,
        background: '#f2f2f2',
        width: '100%',
        border: 0,
        margin: '0 0 15px',
        padding: 15,
        boxSizing: 'border-box',
        fontSize: 14
      },
      button : {
        fontFamily: '"Roboto", sans-serif',
        textTransform: 'uppercase',
        outline: 0,
        background: '#4CAF50',
        width: '100%',
        border: 0,
        padding: 15,
        color: '#FFFFFF',
        fontSize: 14,
        cursor: 'pointer'
      }
});

export default class Login extends Component {
    loginClick(){
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('user_friends');
        firebase.auth().signInWithPopup(provider).then((result) => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(result)
            let userCreds = {
                fbToken: token
            }
            firebase.database().ref("/fbTokens/"+result.user.uid+"/").set(userCreds)
            .then (() => this.handleLogin(user));
            // ...
          }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(error)
            // ...
          });
    }
    handleLogin(token, user, data){
        this.props.authCallback(token, user, data)
    }
    render(){
        return(
            <div className={css(styles.loginPage)}>
                <div className={css(styles.form)}>
                    <button type='button' onClick={() => this.loginClick()} className={css(styles.button)}>Login In with Facebook</button>
                </div>
            </div>
        );
    }
}