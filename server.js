const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require('path');
const users = require("./routes/api/users");
const fileUpload = require('express-fileupload');

const app = express();

const cors = require('cors');
app.use(cors());

app.use(fileUpload());

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

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

// Root endpoint
app.get('/', (_req, res) => {
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

app.listen(port, () => console.log(`Server up and running on port ${port} !`));


module.exports = app; // for testing