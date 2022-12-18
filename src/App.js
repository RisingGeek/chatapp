import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Containers/Home/Home';
import Signin from './Containers/Signin/Signin';
import NavbarComponent from './Components/Navbar/NavbarComponent';
// import Chat from './Containers/Chat/Chat';
import Chats from './Containers/Chats/Chats';
import { connect } from 'react-redux';
import firebase from './Firebase/firebase';
import 'firebase/auth';
import { socket, connectSocket } from './api';
import axios from 'axios';

class App extends Component {
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      connectSocket(this.props.username);
      console.log(socket)
      if (socket) {
        //Get online users
        socket.on('onlineusers', connectedUsers => {
          localStorage.setItem('connectedUsers', Object.keys(connectedUsers));
        })
      }
    }
  }
  //Logout from application
  logout = () => {
    //Firebase sign out function
    axios.post(`${process.env.REACT_APP_PROXY}/deleteToken`,
      {
        username: this.props.username,
        token: this.props.token
      }).then(response => {
        console.log(response)
      })
    firebase.auth().signOut().then(() => {
      this.props.logoutUser();
    }).catch(error => {
      console.log('error occured during logout', error);
    })
    //Clear localStorage
    localStorage.clear();
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavbarComponent loggedIn={this.props.loggedIn} logout={this.logout} />
          <Switch>
            <Route path='/' exact component={Home} />
            {/* <Route path = '/login' component={ Signup } /> */}
            <Route path='/signin' component={Signin} />
            <Route path='/chats' exact component={Chats} />
            <Route path='/chats/:id' component={Chats} />
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
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      dispatch({ type: 'LOGOUT' });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
