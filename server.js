const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require('path');
const cors = require('cors');

const users = require("./routes/api/users");
const contacts = require("./routes/api/contact");
const status = require("./routes/api/status");
const chat = require("./routes/api/chat");
const videoChat = require("./routes/api/videoChat");
// const chat = require('./routes/chat');
// const fileUpload = require('express-fileupload');

// import for twilio
// const pino = require('express-pino-logger')();

const app = express();
// app.use(cors());
// app.use(pino);

// create http server to initialize socketio
const server = require('http').createServer(app);

// app.use(fileUpload());

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(db,
    { useNewUrlParser: true }
)
  // .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use(contacts);
app.use(status);
app.use(chat);
app.use(videoChat);


// socket.io
const socketio = require('socket.io');
const io = socketio(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true
    },
    wsEngine: 'ws'
});

let onlineUsers = []; // array of emails of online users
let socketsId = []; // socket id for online users
let userToRoom = {};

io.on('connect', (socket) => {
  console.log('we have a new connection!');

  socket.on('email', ({ email }) => {
    console.log('socket received email: ', email);
    socket.email = email;
    onlineUsers.push(email);
    socketsId.push(socket.id);
    console.log('online users', onlineUsers);
  });

  socket.on('join', ({ name, email, pairId }) => {
    console.log('join: ' + name, pairId);
    socket.join(pairId);
    userToRoom[email] = pairId;
    // socket.room = pairId;
    // joinRoom(pairId);
    // console.log('clients in room', roomToNumClients[pairId]);
  });

  // pairId, from, to, message, datetime
  socket.on('sendMessage', ({pairId, from, to, message, datetime, type}) => {
    console.log('received message: ' + message + ' to room: ' + pairId);
    io.to(pairId).emit('receiveMessage', { pairId, from, to, message, datetime, type });
  });

  socket.on('initiateVideoCall', ({ pairId, from, to }) => {
    console.log('socket io: initiating video call');
    const index = onlineUsers.indexOf(to);
    if (index > -1) {
      console.log('socket: callee is online');
      if (userToRoom[to] != pairId) {
        console.log('user is online but in a different room');
        console.log('room: ' + pairId + ' callee is in: ' + userToRoom[to]);
        io.to(pairId).emit('videoCallRequestResult', { online: false, accept: false });        
      } else {
        io.to(pairId).emit('receiveVideoCall', { pairId, from, to });
      }
    } else {
      console.log('socket: callee not online');
      io.to(pairId).emit('videoCallRequestResult', { online: false, accept: false });
    }
  });

  socket.on('videoCallRequestDecision', ({ pairId, from, to, accept }) => {
    console.log('socket io: video call request result');
      io.to(pairId).emit('videoCallRequestResult', { online: true, accept } );
  });

  socket.on('disconnect', () => {
    console.log('user had left!', socket.email);

    const index = onlineUsers.indexOf(socket.email);
    if (index > -1) {
      onlineUsers.splice(index, 1);
      socketsId.splice(index, 1);
    }
    console.log('online users', onlineUsers);
  });
});


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server up and running on port ${port} !`));

module.exports = server;