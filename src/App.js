import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom"
import Login from './components/Login'
import Home from './components/Home'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading : true
    };
  }
  setAuth(fbToken, user, friendList){
    this.setState({fbToken:fbToken, user:user, friendList:friendList})
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
    console.log(this.state.user)
    return (
      <BrowserRouter>
        <Switch>
        <PrivateRoute exact path="/" component={Home}/> 
        <PrivateRoute path="/home" component={Home}/>
        <LoginRoute path="/login" component={Login}/>
        </Switch>
      </BrowserRouter>
    );
  }
}



export default App;
