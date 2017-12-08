import React, { Component } from 'react';
import './App.css';
import { Route, Redirect, Switch } from "react-router-dom"
import { NavBar } from './components/Navigation';
import Login from './components/Login'
import Home from './components/Home'
import firebase from 'firebase/app';
import ScheduleTable from './components/ScheduleTable.js'


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
              this.setState({ user: user, friendList: response.data, fbId:user.providerData[0].uid, loading:false })
            }
          );
        });
      }
      else {
        this.setState({ user: null })
        this.setState({ loading: false });
      }
    });
  }

  componentWillUnmount() {
    this.authUnRegFunc();
  }

  handleSignOut(){
    this.setState({errorMessage:null}); //clear any old errors

    /* TODO: sign out user here */
    firebase.auth().signOut()
    .catch(error =>{
      this.setState({errorMessage:error})
    })
  }

  setAuth(user){
    this.setState({user:user})
  }

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        this.state.user ? (
          <Component user={this.state.user} fbID={this.state.fbID} friendList={this.state.friendList} signOutCallback={() => this.handleSignOut()}  {...props}/>
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
    return ( this.state.loading ? (<div className="text-center">
    <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
</div>) :
      <div>
        <Switch>
          <PrivateRoute exact path="/" component={Home}/> 
          <PrivateRoute path="/home" component={Home}/>
          <PrivateRoute path="/class" component={ScheduleTable} />
          <LoginRoute path="/login" component={Login}/>
        </Switch>
      </div>
    );
  }
}



export default App;
