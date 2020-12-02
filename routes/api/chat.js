const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require('path');
const Message = require("../../models/Message");
const User = require("../../models/User");

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

// const storage = multer.diskStorage({
//   destination: path.join(__dirname, '../../uploads'),
//   // destination: function (req, file, cb) {
//   //   cb(null, path.join(__dirname, '../../uploads'))
//   // },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}_${file.originalname}`)
//   },
// });

// const upload = multer({storage: storage}).single("file");

// @route POST /message/uploadfiles
// @descript post a new message with file (image, video, audio) upload, 
// store the file in db and update last interact time accordingly
// @access private
// router.post("/message/uploadfiles", (req, res) => {
//   upload(req, res, err => {
//     if(err) {
//       return res.json({ success: false, err })
//     }
//     else{
//       console.log(req.file);
//     }
//     // return res.json({ success: true, url: res.req.file.path });
//   })
// });
router.post("/message/uploadfiles/", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const file = req.files.file;
  const time = Date.now();
  file.mv(`${__dirname}/../../client/public/uploads/${time}_${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    // res.json({success: true, fileName: file.name, filePath: `uploads/${file.name}`});
    const { pairId, from, to, type } = req.body;
    const message = `uploads/${time}_${file.name}`;
    // console.log(message);
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