import React, { Component } from 'react';
import { connect } from 'react-redux';
import { socket, emitMessage } from '../../api';
import axios from 'axios';
import firebase from '../../Firebase/firebase';
import LoaderComponent from '../../Components/Loader/LoaderComponent';
import ChatComponent from '../../Components/Chat/ChatComponent';

class Chat extends Component {
    state = {
        message: '',
        chats: [],
        sendPhotoLoader: false,
        disabledSend: false,
        disabledPhoto: false,
        isMounted: true,
        userPhoto: ''
    }
    componentDidMount()  {
        if(this.props.username) {
            //Get all the chats
            this.state.isMounted && axios.get(`${process.env.REACT_APP_PROXY}/chat/getchats?from=${this.props.username}&to=${this.props.match.params.id.replace(/-/g,' ')}`)
            .then(response => {
                this.setState({ chats: response.data.chats });
            })
            this.state.isMounted && axios.get(`${process.env.REACT_APP_PROXY}/chat/getPhoto?username=${this.props.match.params.id}`)
            .then(response => {
                this.setState({ userPhoto: response.data.url });
            })
        }
    }
    componentDidUpdate(prevProps) {
        if(prevProps!==this.props) {
            //Get all the chats
            this.state.isMounted && axios.get(`${process.env.REACT_APP_PROXY}/chat/getchats?from=${this.props.username}&to=${this.props.match.params.id.replace(/-/g,' ')}`)
            .then(response => {
                this.setState({ chats: response.data.chats });
            })
            this.state.isMounted && axios.get(`${process.env.REACT_APP_PROXY}/chat/getPhoto?username=${this.props.match.params.id}`)
            .then(response => {
                this.setState({ userPhoto: response.data.url });
            })
        }
        if(socket) {
            //Message received from backend socket
            this.state.isMounted && socket.on(this.props.username, result => {
                if(result.from === this.props.username || result.from === this.props.match.params.id.replace(/-/g,' ')) {
                    //Get all the chats
                    this.state.isMounted && axios.get(`${process.env.REACT_APP_PROXY}/chat/getchats?from=${this.props.username}&to=${this.props.match.params.id.replace(/-/g,' ')}`)
                    .then(response => {
                        this.setState({
                            chats: response.data.chats, 
                            sendPhotoLoader: false, 
                            disabledSend: false ,
                            disabledPhoto: false
                        });
                        let chat = document.querySelector('#chat');
                        if(chat) {
                            chat.scrollTop = chat.scrollHeight;
                        }
                    })
                }
            })
        }
    }
    //Send message
    sendMessage = () => {
        //Emit message to backend socket
        this.state.isMounted && emitMessage(this.props.username, this.props.match.params.id.replace(/-/g,' '), this.state.message);
        this.setState({ message: '', sendPhotoLoader: true, disabledSend: true });
    }
    //Upload image to Firebase Storage
    uploadFile = (e) => {
        //Firebase Storage Reference
        var storageRef = firebase.storage().ref(e.target.files[0].name);
        this.setState({ sendPhotoLoader: true, disabledSend: true, disabledPhoto: true });
        this.state.isMounted && storageRef.put(e.target.files[0]).then(snapshot => {
            //Get download URL
            snapshot.ref.getDownloadURL().then(url => {
                this.setState({ message: url, sendPhotoLoader: false }, () => {
                    this.sendMessage();
                })
            }).catch(e => {
                console.log('error getting url',e)
            })
        }).catch(e=>{
            console.log('error uploading image',e)
        })
    }
    //Set message value on change
    setMessage = (e) => {
        this.setState({message:e.target.value})
    }
    componentWillUnmount() {
        this.setState({ isMounted: false });
    }
    render() {
        return (
            <div className="container pt-4">
                {
                    this.state.sendPhotoLoader ? <LoaderComponent /> : null
                }
                {
                    this.props.username ? 
                    <ChatComponent 
                    chats={this.state.chats}
                    message={this.state.message}
                    disabledPhoto={this.state.disabledPhoto}
                    uploadFile={this.uploadFile}
                    sendMessage={this.sendMessage}
                    setMessage={this.setMessage}
                    disabledSend={this.state.disabledSend}
                    username={this.props.username}
                    userPhoto={this.state.userPhoto}
                    chatname={this.props.match.params.id.replace(/-/g,' ')}
                    />:<h1 className="text-center">Login to chat</h1>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        token: state.token,
        username: state.username
    }
}

export default connect(mapStateToProps)(Chat);