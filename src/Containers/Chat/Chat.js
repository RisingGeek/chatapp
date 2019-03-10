import React, { Component } from 'react';
import { connect } from 'react-redux';
import { socket, connectSocket, emitMessage, listenMessage } from '../../api';

class Chat extends Component {
    state = {
        message: '',
        chats: []
    }
    componentDidMount()  {
        this.setState({ isMounted: true });
    }
    componentDidUpdate(prevProps) {
        if(prevProps!==this.props) {
            connectSocket(this.props.username);
            socket.on(this.props.username, result => {
                console.log(result);
                this.setState({
                    ...this.state,
                    chats: this.state.chats.concat({from: result.from, to: result.to, message: result.message})
                });
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
                        <p key={i}>{chat.from}: {chat.message}</p>
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