const express = require("express");
const router = express.Router();
const { chatToken, videoToken, voiceToken } = require('./tokens');
const config = require('./config');

const sendTokenResponse = (token, res) => {
  console.log(token.toJwt());
  res.status(200).json({token: token.toJwt()});
  // res.set("Content-Type", "application/json");
  // res.send(
  //   JSON.stringify({
  //     token: token.toJwt(),
  //   })
  // );
};
// twilio routes
router.get("/api/greeting", (req, res) => {
  const name = req.query.name || "World";
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

router.get("/chat/token", (req, res) => {
  const identity = req.query.identity;
  const token = chatToken(identity, config);
  sendTokenResponse(token, res);
});

router.post("/chat/token", (req, res) => {
  console.log("hello");
  const identity = req.body.identity;
  const token = chatToken(identity, config);
  sendTokenResponse(token, res);
});

router.get("/video/token", (req, res) => {
  const identity = req.query.identity;
  const room = req.query.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

router.post("/video/token", (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

router.get("/voice/token", (req, res) => {
  const identity = req.body.identity;
  const token = voiceToken(identity, config);
  sendTokenResponse(token, res);
});

router.post("/voice/token", (req, res) => {
  const identity = req.body.identity;
  const token = voiceToken(identity, config);
  sendTokenResponse(token, res);
});

module.exports = router;
