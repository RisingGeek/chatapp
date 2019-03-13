import React, { Component } from 'react';
import SignupComponent from '../../Components/Signup/SignupComponent';
import firebase from '../../Firebase/firebase';
import 'firebase/auth';
import 'firebase/database';
import { connect } from 'react-redux';
import axios from 'axios';
//import { socket } from '../../api';

class Signup extends Component {
    state = {
        isMounted: true
    }
    //Signup user through Firebase Google Authentication
    signup = () => {
        var provider=new firebase.auth.GoogleAuthProvider();
        this.state.isMounted && firebase.auth().signInWithPopup(provider).then(result => {
            var token = result.credential.accessToken;
            var user = result.user;
            this.props.loginUser( {token: token, username: user.displayName, photo: user.photoURL } );
            
            var ref=firebase.database().ref();
            var usersRef=ref.child('users');
            usersRef.push({
                token: this.props.token,
                username: this.props.username,
                photo: this.props.photo
            })

            //Add user to database
            this.state.isMounted && axios.post(`/adduser?username=${user.displayName}&photo=${user.photoURL}`)
            .then(res => {
                console.log(res.data);
                this.props.history.push('/');
            }).catch(error => {
                console.log('could not save user to database',error);
            })
        }).catch((error) => {
            console.log('could not sign in user');
        })
    }
    componentWillUnmount() {
        this.setState({ isMounted: false });
    }
    render() {
        return (
            <div>
                {
                    this.props.username ? 
                    <h1 className="text-center">You are already logged in.</h1> : 
                    <SignupComponent signup={this.signup} heading={this.props.location.pathname} />
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn,
        token: state.token,
        username: state.username,
        photo: state.photo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (item) => {
            dispatch({ type: 'LOGIN', payload: item });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);