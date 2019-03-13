import io from 'socket.io-client';
import axios from 'axios';
var socket;

//Connect to socket
function connectSocket(username) {
    socket = io.connect('/');
    socket.emit('register', username);
}

//Emit a message
function emitMessage(fromValue, toValue, messageValue) {
    axios.post(`/chat/addchat?from=${fromValue}&to=${toValue}&message=${messageValue}`)
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