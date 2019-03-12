import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';
import Signup from './Containers/Signup/Signup';
import NavbarComponent from './Components/Navbar/NavbarComponent';
import Chat from './Containers/Chat/Chat';
import { connect } from 'react-redux'; 
import firebase from './Firebase/firebase';
import 'firebase/auth';
import { socket, connectSocket } from './api';
class App extends Component {
  componentDidUpdate(prevProps) {
    if(this.props!==prevProps) {
      console.log('yo')
      connectSocket(this.props.username);
      if(socket) {
        socket.on('onlineusers', connectedUsers => {
            localStorage.setItem('connectedUsers', Object.keys(connectedUsers));
        })
      } 
    }
  }
  logout = () => {
    firebase.auth().signOut().then(() => {
      console.log('successful');
      //window.location = "https://mail.google.com/mail/u/0/?logout&hl=en?continue=localhost:3000";
      //GIDSignIn.sharedInstance().signOut()
      this.props.logoutUser();
    }).catch(error => {
      console.log(error);
    })
    localStorage.clear();
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
            <Route path = '/chat/:id' component={ Chat } />
          </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    username: state.username,
    //connectedUsers: state.connectedUsers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      dispatch({ type: 'LOGOUT'});
    },
    // updateConnectedUsers: (connectedUsers) => {
    //   //console.log(connectedUsers)
    //   dispatch({type: 'CONNECTED', payload: connectedUsers})
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
