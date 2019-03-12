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
        //console.log(this.props.username)
        if(this.props.username) {
            axios.get(`http://localhost:5001/chat/getchats?from=${this.props.username}&to=${this.props.match.params.id.replace(/-/g,' ')}`)
            .then(response => {
                console.log(response)
                this.setState({ chats: response.data.chats });
            })
        }
    }
    componentDidUpdate(prevProps) {
        if(prevProps!==this.props) {
            axios.get(`http://localhost:5001/chat/getchats?from=${this.props.username}&to=${this.props.match.params.id.replace(/-/g,' ')}`)
            .then(response => {
                //console.log(response)
                this.setState({ chats: response.data.chats });
            })
            //console.log('component update')
            //connectSocket(this.props.username);
        }
        if(socket) {
        socket.on(this.props.username, result => {
            console.log('socket received on front end')
            if(result.from === this.props.username || result.from === this.props.match.params.id.replace(/-/g,' ')) {
                axios.get(`http://localhost:5001/chat/getchats?from=${this.props.username}&to=${this.props.match.params.id.replace(/-/g,' ')}`)
            .then(response => {
                console.log(response)
                this.setState({ chats: response.data.chats });
            })
            }
            else {
                console.log('no')
            }
        })
    }
    }
    sendMessage = () => {
        //console.log(this.props.match.params)
        emitMessage(this.props.username, this.props.match.params.id.replace(/-/g,' '), this.state.message);
        this.setState({ message: '' });
    }
    render() {
        return (
            <div className="container pt-5">
                <div className="pb-5" style={{height:'60vh', overflowY:'scroll'}}>
                {
                    this.state.chats.map((chat,i) => (
                        <p key={i}>{chat.from===this.props.username?'You':chat.from}: {chat.message}</p>
                    ))
                }
                </div>
                <div className="row pt-5 text-center">
                    <div className="col-sm-11">
                        <input type="text" value={this.state.message} className="form-control" onChange={e=>this.setState({message:e.target.value})} />
                    </div>
                    <div className="col-sm-1">
                        <button className="btn btn-info" onClick={this.sendMessage}>send</button>
                    </div>
                </div>
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