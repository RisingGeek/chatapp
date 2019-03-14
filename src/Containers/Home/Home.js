import React, { Component } from 'react';
import 'firebase/database';
import UserComponent from '../../Components/Home/UserComponent';
import { connect } from 'react-redux';
import axios from 'axios';
import { socket } from '../../api';
import 'firebase/storage';
import LoaderComponent from '../../Components/Loader/LoaderComponent';

class Home extends Component {
    state = {
        users: [],
        connectedUsers: '',
        usersLoader: true,
        isMounted: true
    }
    componentDidMount() {
        //Get all users
        this.state.isMounted && axios.get(process.env.REACT_APP_PROXY+'/getusers')
        .then(response => {
            this.setState({ users: response.data.users, usersLoader: false });
        })

        //Get connected users from localStorage
        if(localStorage.getItem('connectedUsers')) {
            this.setState({ connectedUsers: localStorage.getItem('connectedUsers').split(',') });
        }
    }
    componentDidUpdate() {
        //Get online users and save to localStorage
        if(socket) {
            socket.on('onlineusers', connectedUsers => {
                localStorage.setItem('connectedUsers', Object.keys(connectedUsers));
                this.setState({ connectedUsers: Object.keys(connectedUsers) });
            })
        }
    }
    componentWillUnmount() {
        this.setState({ isMounted: false });
    }
    render() {
        return (
            <div className="container">
                {
                    this.props.username?null:<h3 className="text-center py-2">Login to see online users</h3>
                }
                {
                    this.state.usersLoader ? 
                    <div>
                        <LoaderComponent />
                        <h1 className="text-center">Loading Users...</h1>
                    </div> :
                    <UserComponent users={this.state.users} connectedUsers={this.state.connectedUsers} />
                }
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