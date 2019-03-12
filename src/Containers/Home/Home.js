import React, { Component } from 'react';
import firebase from '../../Firebase/firebase';
import 'firebase/database';
import UserComponent from '../../Components/Home/UserComponent';
import { connect } from 'react-redux';
import axios from 'axios';
import { socket } from '../../api';

class Home extends Component {
    state = {
        users: [],
        connectedUsers: ''
    }
    componentDidMount() {
        axios.get('http://localhost:5001/getusers')
        .then(response => {
            this.setState({ users: response.data.users });
        })
        if(localStorage.getItem('connectedUsers')) {
            this.setState({ connectedUsers: localStorage.getItem('connectedUsers').split(',') });
        }
    }
    componentDidUpdate() {
        //console.log(this.state.connectedUsers)
        if(socket) {
            socket.on('onlineusers', connectedUsers => {
                localStorage.setItem('connectedUsers', Object.keys(connectedUsers));
                this.setState({ connectedUsers: Object.keys(connectedUsers) });
            })
        }
    }
    render() {
        return (
            <div className="container">
                {
                    this.props.username?null:<h3 className="text-center py-2">login to see online users</h3>
                }
                <UserComponent users={this.state.users} connectedUsers={this.state.connectedUsers} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        username: state.username
    }
}

export default connect(mapStateToProps)(Home);