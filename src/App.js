import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Redirect} from "react-router-dom"
import Login from './components/Login'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Login}/> 
        {/* <PrivateRoute path="/home" component={Login}/> */}
        {/* <LoginRoute path="/login" component={Login}/> */}
      </BrowserRouter>
    );
  }
}

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     fakeAuth.isAuthenticated ? (
//       <Component {...props}/>
//     ) : (
//       <Redirect to={{
//         pathname: '/login',
//         state: { from: props.location }
//       }}/>
//     )
//   )}/>
// )
// const LoginRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     fakeAuth.isAuthenticated ?(
//       <Redirect to={{
//         pathname: '/',
//         state: { from: props.location }
//       }}/>
//     ):
//      (
//       <Component {...props}/>
//     )
//   )}/>
// )

export default App;
