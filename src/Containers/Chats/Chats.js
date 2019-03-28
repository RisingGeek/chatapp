import React, { Component } from 'react';
import ChatsComponent from '../../Components/Chats/ChatsComponent';
import axios from 'axios';
import { connect } from 'react-redux';
import { socket } from '../../api';

class Chats extends Component {
    state = {
        allUsersChat: [],
        isMounted: true,
        connectedUsers: []
    }
    componentDidMount() {
        if(this.props.username) {
            this.getAllUsersChats();
        }
        if(localStorage.getItem('connectedUsers')) {
            this.setState({ connectedUsers: localStorage.getItem('connectedUsers').split(',') });
        }
    }
    componentDidUpdate(prevProps) {
        if(prevProps.username !== this.props.username) {
            this.getAllUsersChats();
        }
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
    getAllUsersChats = () => {
        axios.get(`${process.env.REACT_APP_PROXY}/chat/getAllUsersChats?user=${this.props.username}`)
        .then(res => {
            axios.get(`${process.env.REACT_APP_PROXY}/getusers`).then(allUsers => {
                res.data.allUsersChat.forEach(chat => {
                    let userOne = allUsers.data.users.find(user => chat.userOne===user.username);
                    let userTwo = allUsers.data.users.find(user => chat.userTwo===user.username);
                    if(this.props.username!==chat.userOne && userOne) {
                        chat.photo = userOne.photo;
                    }
                    else if(this.props.username!==chat.userTwo && userTwo) {
                        chat.photo = userTwo.photo
                    }
                })
                this.setState({ allUsersChat: res.data.allUsersChat });
            })
        })
    }
    render() {
        return (
            <ChatsComponent 
            allUsersChat={this.state.allUsersChat} 
            username={this.props.username}
            id={this.props.match.params.id}
            connectedUsers={this.state.connectedUsers} />
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.username
    }
}

export default connect(mapStateToProps)(Chats);