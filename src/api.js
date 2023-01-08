import io from 'socket.io-client';
import axios from 'axios';
var socket;

//Connect to socket
function connectSocket(username) {
    socket = io.connect(process.env.REACT_APP_DOMAIN, {
        path: "/socket.io"
    });
    socket.emit('register', username);
}

//Emit a message
function emitMessage(fromValue, toValue, messageValue, token) {
    axios.post(`${process.env.REACT_APP_PROXY}/chat/addchat?from=${fromValue}&to=${toValue}&message=${messageValue}&token=${token}`)
        .then(response => {
            socket.emit('private', {
                from: fromValue,
                to: toValue,
                message: messageValue,
                date: response.data.date
            })
        })
}

export { socket, connectSocket, emitMessage };