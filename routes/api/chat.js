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
  accessKeyId: 'ASIA2Q43VL2W3N57GPNH',
  secretAccessKey: 'VICkytQe9sHOQu4Jbo1+eC9YgLQkjG+OXRUK43+X',
  Bucket: process.env.AWS_S3_BUCKET,
  sessionToken: 'FwoGZXIvYXdzEOj//////////wEaDGjjiSVsUUJgj90blyLFASw6piIwb1+k465Fxcg2q+jr33Qu4DkE7LhjQMNj/icb39O/MzS0vpNySRYaVxljXJD/RRTVlyr92E6Z6FamTNSTYFHLj+wWfo0Or37LN19QWepzVDyreCfR9XK4Vb5NtL0Vm+SCDl01FQ5Kjph074CZLjmWoWdctfkXaiibp8wYo1cx03xdd5raIXpwKkj7rkLJqRbjq8tV6GP8IEzqsUQkvtj3eBNVKP6Z+XiNc0UYvovE3EM8KCYnqnMID4HgveSG3ExpKNuKx/4FMi0BLMmVpxezHr4HivUbQFwML810kMRtKAXAQWYwEYo5t5YJyhYtSFOoQspB2+Y='
  // accessKeyId: process.env.AWS_ACCESS_ID,
  // secretAccessKey: process.env.AWS_SECRET_KEY,
  // Bucket: process.env.AWS_S3_BUCKET,
  // sessionToken: process.env.AWS_SESSION_TOKEN
})
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
  bucket: process.env.AWS_S3_BUCKET,
  acl: 'public-read',
  key: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
});
const upload = multer({storage: storage}).single('NonTextfile')
// const upload = multer({dest: 'uploads/'}).single('NonTextfile');
router.post("/message/uploadfiles/", (req, res) => {
  upload(req, res, (error) => {
    if (error){
      console.log('errors', error);
    };
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    };
    // const file = req.files.file;
    // const time = Date.now();
    // move file to s3
    // const params = {
    //   Bucket: process.env.AWS_S3_BUCKET,
    //   Key: `${time}_${file.name}`,
    //   Body: file.data
    // }
    // S3.upload(params, (error, data)=> {
    //   if (error){
    //     res.status(500).send(error);
    //   }else{
    //     res.status
    //   }
    // })
    const { pairId, from, to, type } = req.body;
    console.log(req.file);
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