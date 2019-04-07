import React, { Component, Fragment } from 'react';
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
        setTimeout(this.listenSocket,1000);
        if(this.props.username) {
            //Get all the chats
            this.state.isMounted && axios.get(`${process.env.REACT_APP_PROXY}/chat/getchats?from=${this.props.username}&to=${this.props.id.replace(/-/g,' ')}&token=${this.props.token}`)
            .then(response => {
                this.setState({ chats: response.data.chats });
            })
            this.state.isMounted && axios.get(`${process.env.REACT_APP_PROXY}/chat/getPhoto?username=${this.props.id}`)
            .then(response => {
                this.setState({ userPhoto: response.data.url });
            })
        }
    }
    componentDidUpdate(prevProps) {
        if(prevProps!==this.props) {
            // setTimeout(()=>this.listenSocket(),1000)
            //Get all the chats
            this.state.isMounted && axios.get(`${process.env.REACT_APP_PROXY}/chat/getchats?from=${this.props.username}&to=${this.props.id.replace(/-/g,' ')}&token=${this.props.token}`)
            .then(response => {
                this.setState({ chats: response.data.chats });
            })
            this.state.isMounted && axios.get(`${process.env.REACT_APP_PROXY}/chat/getPhoto?username=${this.props.id}`)
            .then(response => {
                this.setState({ userPhoto: response.data.url });
            })
        }
    }
    //Listen to socket changes
    listenSocket = () => {
        this.state.isMounted && socket.on(this.props.username, result => {
            console.log('msg reveived')
            if(result.from === this.props.username || result.from === this.props.id.replace(/-/g,' ')) {
                this.setState({
                    chats: this.state.chats.concat(result), 
                    sendPhotoLoader: false, 
                    disabledSend: false ,
                    disabledPhoto: false
                });
                let chat = document.querySelector('#chat');
                if(chat) {
                    chat.scrollTop = chat.scrollHeight;
                }
            }
        })
    }
    //Send message
    sendMessage = () => {
        //Emit message to backend socket
        this.setState({ message: '', sendPhotoLoader: true, disabledSend: true });
        this.state.isMounted && emitMessage(this.props.username, this.props.id.replace(/-/g,' '), this.state.message, this.props.token);
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
            <Fragment>
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
                    chatname={this.props.id.replace(/-/g,' ')}
                    />:<h1 className="text-center">Login to chat</h1>
                }
            </Fragment>
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