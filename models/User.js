const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  profile_picture: {	
    type: String,	
    default: ""	
  },
  password: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  failed_login_attempts: {
    type: Number,
    required: false
  },
  failed_login_time: {
    type: Date,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  contacts : [{
    pairId: mongoose.Schema.Types.ObjectId,
    email: String,
    lastInteractTime: Date,
  }],
  status : [{
    statusId: mongoose.Schema.Types.ObjectId,
    image: String,
    text: String,
    time: Date,
  }],
  seen : [ String ]
});

module.exports = User = mongoose.model("users", UserSchema);
