import io from 'socket.io-client';
var socket;

//Listen to connections
function connectSocket(username) {
    socket = io.connect('http://localhost:5001');
    socket.emit('register', username);
}

//Emit a message
function emitMessage(fromValue, toValue, messageValue) {
    socket.emit('private', {
        from: fromValue,
        to: toValue,
        message: messageValue
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