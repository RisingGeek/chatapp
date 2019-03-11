import io from 'socket.io-client';
import axios from 'axios';
var socket;

//Listen to connections
function connectSocket(username) {
    socket = io.connect('http://localhost:5001');
    socket.emit('register', username);
}

//Emit a message
function emitMessage(fromValue, toValue, messageValue) {
    axios.post(`http://localhost:5001/chat/addchat?from=${fromValue}&to=${toValue}&message=${messageValue}`)
    .then(response => {
        console.log(response);
        socket.emit('private', {
            from: fromValue,
            to: toValue,
            message: messageValue
        })
    })
}

function listenMessage() {
    // return new Promise((resolve, reject) => {
    //     socket.on('chat', (data) => {
    //         console.log('message reveived')
    //         resolve({ data: data });
    //     })
    // })
}
export { socket, connectSocket, emitMessage, listenMessage  };