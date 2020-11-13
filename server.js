const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require('path');
const cors = require('cors');

const users = require("./routes/api/users");
const chat = require('./routes/chat');
const fileUpload = require('express-fileupload');

const app = express();
app.use(cors());

// create http server to initialize socketio
const server = require('http').createServer(app);

app.use(fileUpload());

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
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

// socket.io
const socketio = require('socket.io');
const io = socketio(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true
    }
});

io.on('connect', (socket) => {
  console.log('we have a new connection!');

  socket.on('join', ({name, room}) => {
    console.log('join: ' + name, room);
    socket.join(room);
  });

  socket.on('sendMessage', ({message, room, username}) => {
    console.log('received message: ' + message + ' to room: ' + room);
    io.to(room).emit('receiveMessage', {text: message, user: username});
  });

  socket.on('disconnect', () => {
    console.log('user had left!');
  });
});

// Root endpoint
app.get('/message', (_req, res) => {
  res.json({ message: 'Welcome to our chat app' });
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