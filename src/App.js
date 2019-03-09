import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';
import Signup from './Containers/Signup/Signup';
import NavbarComponent from './Components/Navbar/NavbarComponent';
import { connect } from 'react-redux'; 
import firebase from './Firebase/firebase';
import 'firebase/auth';

class App extends Component {
  logout = () => {
    firebase.auth().signOut().then(() => {
      console.log('successful');
      this.props.logoutUser();
    }).catch(error => {
      console.log(error);
    })
  }
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <NavbarComponent loggedIn={this.props.loggedIn} logout={this.logout} />
          <Switch>
            <Route path = '/' exact component={ Home } />
            <Route path = '/login' component={ Login } />
            <Route path = '/signup' component={ Signup } />
          </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      dispatch({ type: 'LOGOUT'} );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
