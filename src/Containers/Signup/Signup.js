import React, { Component } from 'react';
import SignupComponent from '../../Components/Signup/SignupComponent';
import firebase from '../../Firebase/firebase';
import 'firebase/auth'
import { connect } from 'react-redux';

class Signup extends Component {
    signup = () => {
        var provider=new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(result => {
            var token = result.credential.accessToken;
            var user = result.user;
            this.props.loginUser();
            this.props.history.push('/');
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
        loggedIn: state.loggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: () => {
            dispatch({ type: 'LOGIN' });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);