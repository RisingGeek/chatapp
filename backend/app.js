const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
var indexRouter = require('./routes/index');
var chatRouter = require('./routes/chat');
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/chat', chatRouter);

var socketIO = require('socket.io');
const server = app.listen(PORT,() => console.log('server started on port',PORT));
//io.set('origins', '*:*');
var io = socketIO(server);

var connectedUsers = {};
io.on('connection', socket => {
  console.log('a user connected',socket.id);
  socket.on('register',username => {
    if(username) {
      connectedUsers[username]=socket;
      //console.log(connectedUsers[username])
    }
  })
  socket.on('private', (data) => {
    console.log(data)
    //console.log(connectedUsers[data.to])
    io.sockets.emit(data.from,data);
    io.sockets.emit(data.to,data);
  })
})