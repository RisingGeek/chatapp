import React, { Component } from 'react';
import SignupComponent from '../../Components/Signup/SignupComponent';
import firebase from '../../Firebase/firebase';
import 'firebase/auth';
import 'firebase/database';
import { connect } from 'react-redux';

class Signup extends Component {
    componentDidMount() {
        
    }
    signup = () => {
                var provider=new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(provider).then(result => {
                    var token = result.credential.accessToken;
                    var user = result.user;
                    this.props.loginUser( {token: token, username: user.displayName, photo: user.photoURL } );
                    this.props.history.push('/');
                    
                    var ref=firebase.database().ref();
                    var usersRef=ref.child('users');
                    usersRef.push({
                        token: this.props.token,
                        username: this.props.username,
                        photo: this.props.photo
                    })
                    console.log(this.props.username)
                }).catch((error) => {
    
                })
    }
    render() {
        return (
            <div>
                <SignupComponent signup={this.signup} />
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