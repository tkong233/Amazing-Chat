const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  pairId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  datetime: {
    type: Date,
    default: Date.now
  },
  type:{
    type: String
  }
});

module.exports = Message = mongoose.model("messages", MessageSchema);