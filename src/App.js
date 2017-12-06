import React, { Component } from 'react';
import './App.css';
import { Route, Redirect, Switch } from "react-router-dom"
import { Header } from './components/Header';
import Login from './components/Login'
import Home from './components/Home'

import firebase from 'firebase/app';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading : true
    };
  }

  componentDidMount() {
    this.authUnRegFunc = firebase.auth().onAuthStateChanged(user => {
      console.log("Auth Change", user)
      if (user) {
        firebase.database().ref('/fbTokens/' + user.uid).once('value').then((snapshot) => {
          let fbToken = snapshot.val().fbToken;
          window.FB.api(
            '/me/friends',
            'GET',
            {
                access_token:fbToken,
                scope:'user_friends'
            },
            (response) => {
              console.log(response)
              this.setState({ user: user, friendList: response.data })
            }
          );
        });
      }
      else {
        this.setState({ user: null })
      }
      this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    this.authUnRegFunc();
  }

  setAuth(user){
    this.setState({user:user})
  }
  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        this.state.user ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>
        )
      )}/>
    )
    const LoginRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        this.state.user ?(
          <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }}/>
        ):
         (
          <Component authCallback={(fbToken, user, friendList) => this.setAuth(fbToken, user, friendList)} {...props}/>
        )
      )}/>
    )
    return (
      <div>
        <Header />
        <Switch>
          <PrivateRoute exact path="/" component={Home}/> 
          <PrivateRoute path="/home" component={Home}/>
          <LoginRoute path="/login" component={Login}/>
        </Switch>
      </div>
    );
  }
}



export default App;
