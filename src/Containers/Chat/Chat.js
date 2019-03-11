import React, { Component } from 'react';
import { connect } from 'react-redux';
import { socket, connectSocket, emitMessage, listenMessage } from '../../api';
import axios from 'axios';

class Chat extends Component {
    state = {
        message: '',
        chats: []
    }
    componentDidMount()  {
        this.setState({ isMounted: true });
        axios.get(`http://localhost:5001/chat/getchats?from=${this.props.username}&to=${this.props.match.params.id.replace(/-/g,' ')}`)
        .then(response => {
            console.log(response)
            this.setState({ chats: response.data.chats });
        })
    }
    componentDidUpdate(prevProps) {
        if(prevProps!==this.props) {
            axios.get(`http://localhost:5001/chat/getchats?from=${this.props.username}&to=${this.props.match.params.id.replace(/-/g,' ')}`)
            .then(response => {
                console.log(response)
                this.setState({ chats: response.data.chats });
            })
            connectSocket(this.props.username);
            socket.on(this.props.username, result => {
                if(result.from === this.props.username || result.from === this.props.match.params.id.replace(/-/g,' ')) {
                    this.setState({
                        ...this.state,
                        chats: this.state.chats.concat({
                            from: result.from, 
                            to: result.to, 
                            message: result.message})
                    });
                }
            })
        }
    }
    sendMessage = () => {
        console.log(this.props.match.params)
        this.state.isMounted && emitMessage(this.props.username, this.props.match.params.id.replace(/-/g,' '), this.state.message);
    listenMessage()
    }
    render() {
        return (
            <div className="container pt-5">
                <input type="text" value={this.state.message} onChange={e=>this.setState({message:e.target.value})} />
                <button className="btn" onClick={this.sendMessage}>send</button>
                {/* <p>{this.state.data.from}: {this.state.data.message}</p> */}
                {
                    this.state.chats.map((chat,i) => (
                        <p key={i}>{chat.from===this.props.username?'You':chat.from}: {chat.message}</p>
                    ))
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