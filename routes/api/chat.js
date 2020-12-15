const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const Message = require("../../models/Message");
const User = require("../../models/User");

const S3 = new AWS.S3({
  accessKeyId: 'ASIA2Q43VL2W2ZW3J3KF',
  secretAccessKey: 'Mahg4zp9+W26Xzwsj0FPjez91E9qakbdIfxNJty/',
  Bucket: process.env.AWS_S3_BUCKET,
  sessionToken: 'FwoGZXIvYXdzEDwaDDA9qnzilPrIrSQsQCLFAe3SK3JT7olZMTfjxWtFSAwt7nH0n/PWf61qMYzhBnyv1iHHW/D35Vus+tJsea6yxNkcLHdD3d7DrJha0DfcVq3Ch1x1fMUoHgxUbIcyCi6SHtAVHAtLHrnBJ/iiRfl3rZ1YqH9hxz2weegFakqa8ip5oLXC7lfw3mlKlGAJGaVPf/DTMvbQO3DMTiGxvQQ5Ab+jojSqqM3CzFjqC0q6wxF7abVTtNCtAxUGg40R1laZ4HOM+Y3m6kyL68EyAP3V0Z/btoJRKIK+2f4FMi3sIQZTnFZtkxn334q/tQ9ZZwVFU6Iid6HGkvA5RRfYDGzXJxwEzpW8DM/0fN4='
  // accessKeyId: process.env.AWS_ACCESS_ID,
  // secretAccessKey: process.env.AWS_SECRET_KEY,
  // Bucket: process.env.AWS_S3_BUCKET,
  // sessionToken: process.env.AWS_SESSION_TOKEN
});

// @route GET /messages/:pairId
// @descript get list of messages for the specified pairId
// @access Public
router.get('/messages/:pairId', (req, res) => {
  const pairId = req.params.pairId;
  Message.find({ pairId }).then(messages => {
    return res.status(200).json(messages);
  }).catch(err => { return res.status(400).json(err) });
});

// @route POST /message
// @descript post a new message, store the message in db
//           and update last interact time accordingly
// @access Public
router.post('/message', (req, res) => {
  const { pairId, from, to, message, type } = req.body;
  const newMessage = new Message({
    pairId,
    from,
    to,
    message,
    type
  });

  // save message
  newMessage.save()
  .then((savedMessage) => {

    // update sender's last interact time
    User.findOne({ email: from }).then(sender => {
      const senderContact = sender.contacts.filter((c) => { return c.email === to });
      if (senderContact.length <= 0) {
        return res.status(400).json({ message: "receiver does not exist or is not a contact with sender" });
      }
      senderContact[0].lastInteractTime = Date.now();

      sender.save().then(() => {

        // update receiver's last interact time
        User.findOne({ email: to }).then(receiver => {
          const receiverContact = receiver.contacts.filter((c) => { return c.email === from });
          if (receiverContact.length <= 0) {
            return res.status(400).json({ message: "sender does not exist or is not a contact with receiver" });
          }
          receiverContact[0].lastInteractTime = Date.now();

          receiver.save().then(() => {
            return res.status(200).json({ savedMessage });
          })
        })
      })
    })
  })
  .catch(err => res.status(400).json(err));
});

// @route POST /message/uploadfiles
// @descript post a new message with file (image, video, audio) upload, 
// store the file in db and update last interact time accordingly
// @access private
const storage = multerS3({
  s3: S3,
  bucket: 'cis557-amazing-chat',
  acl: 'public-read',
  key: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
});
const upload = multer({storage: storage}).single('NonTextfile')

router.post("/message/uploadfiles/", (req, res) => {
  upload(req, res, (error) => {
    if (error){
      console.log('errors', error);
    };
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    };
    const { pairId, from, to, type } = req.body;
    // console.log(req.file);
    const message = req.file.location;
    const newMessage = new Message({
      pairId,
      from,
      to,
      message,
      type
    });
  
    // save message
    newMessage.save()
    .then((savedMessage) => {
  
      // update sender's last interact time
      User.findOne({ email: from }).then(sender => {
        const senderContact = sender.contacts.filter((c) => { return c.email === to });
        if (senderContact.length <= 0) {
          return res.status(400).json({ message: "receiver does not exist or is not a contact with sender" });
        }
        senderContact[0].lastInteractTime = Date.now();
  
        sender.save().then(() => {
  
          // update receiver's last interact time
          User.findOne({ email: to }).then(receiver => {
            const receiverContact = receiver.contacts.filter((c) => { return c.email === from });
            if (receiverContact.length <= 0) {
              return res.status(400).json({ message: "sender does not exist or is not a contact with receiver" });
            }
            receiverContact[0].lastInteractTime = Date.now();
  
            receiver.save().then(() => {
              return res.status(200).json({ savedMessage });
            })
          })
        })
      })
    })
    .catch(err => res.status(400).json(err));
  });

});

module.exports = router;