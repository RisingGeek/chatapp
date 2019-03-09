import React, { Component } from 'react';
import firebase from '../../Firebase/firebase';
import 'firebase/database';
import UserComponent from '../../Components/Home/UserComponent';
import { connect } from 'react-redux';

class Home extends Component {
    state = {
        users: []
    }
    componentDidMount() {
        var ref = firebase.database().ref('/users');
        ref.once('value').then(snapshot => {
            snapshot.forEach(data => {
                if(data.val().token !== this.props.token) {
                    this.setState({
                        ...this.state,
                        users: this.state.users.concat({
                            token: data.val().token,
                            username: data.val().username, 
                            photo: data.val().photo
                        })
                    });
            }
            })
        })
    }
    render() {
        return (
            <div className="container pt-5">
                <UserComponent users={this.state.users} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(Home);