import io from 'socket.io-client';
import axios from 'axios';
var socket;

//Connect to socket
function connectSocket(username) {
    socket = io.connect(process.env.REACT_APP_PROXY);
    socket.emit('register', username);
}

//Emit a message
function emitMessage(fromValue, toValue, messageValue) {
    axios.post(`${process.env.REACT_APP_PROXY}/chat/addchat?from=${fromValue}&to=${toValue}&message=${messageValue}`)
    .then(response => {
        //console.log(response);
        socket.emit('private', {
            from: fromValue,
            to: toValue,
            message: messageValue
        })
    })
}

export { socket, connectSocket, emitMessage };