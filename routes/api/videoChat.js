const express = require("express");
const router = express.Router();
const { videoToken } = require('./tokens');
const config = require('./config');

const sendTokenResponse = (token, res) => {
  res.status(200).json({token: token.toJwt()})
};
// twilio routes

// @route POST video/token
// @desc get token from twilio
// @access Private
router.post("/video/token", (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

module.exports = router;
