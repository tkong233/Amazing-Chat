const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const Validator = require("validator");
const mongodb = require('mongodb');
const mongoose = require("mongoose");

// Load User model
const User = require("../../models/User");

// @route GET /cotacts
// @descript get a list of contacts for the user
// @access Public
router.get("/contacts/:email", (req, res) => {
  const email = req.params.email;
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "user not found"});
    }
    const contacts = user.contacts;
    return res.status(200).json({ contacts });
  }).catch(err => console.log(err));
});

// @route POST /contact
// @descript create a new contact between two users
// @access Public
router.post("/contact", (req, res) => {
  const { email1, email2 } = req.body;

  // add user2 to user1's contact
  User.findOne({ email : email1 }).then((user1) => {
    if (!user1) {
      return res.status(404).json({ message: "user not found" });
    }
    const pairId = new mongoose.Types.ObjectId();
    const exist1 = user1.contacts.find((c) => c.email === email2);
    if (exist1) {
      return res.status(400).json({ message: "contact already exist" });
    } else {
      user1.contacts.push({
        pairId,
        email: email2,
        lastInteractTime: Date.now()
      });
      user1.save().then(
        // add user1 to user2's contact
        User.findOne({ email : email2 }).then((user2) => {
          if (!user2) {
            return res.status(404).json({ message: "user not found" });
          }
          const exist2 = user2.contacts.find((c) => c.email === email1);
          if (exist2) {
            return res.status(400).json({ message: "contact already exist" });
          } else {
            user2.contacts.push({
              pairId,
              email: email1,
              lastInteractTime: Date.now()
            });
            user2.save().then(_ => {
              return res.status(200).json({ message: "contact added successfully" });
            });
          }
        })
      )
    }
  }).catch(err => console.log(err));
});

// @route DELETE /contact
// @descript delete a pair of contact
// @access Public

router.delete("/contact", (req, res) => {
  const { email1, email2 } = req.body;
  // delete user2 in user1's contacts
  User.findOne({ email: email1 }).then((user1) => {
    if (!user1) {
      return res.status(404).json({ message: "user not found" });
    }
    const contacts1 = user1.contacts;
    const updatedContacts1 = contacts1.filter(c => c.email != email2);
    user1.contacts = updatedContacts1;
    user1.save().then(_ => {
      // delete user1 in user2's contacts
      User.findOne({ email: email2 }).then((user2) => {
        if (!user2) {
          return res.status(404).json({ message: "user not found" });
        }
        const contacts2 = user2.contacts;
        const updatedContacts2 = contacts2.filter(c => c.email != email1);
        user2.contacts = updatedContacts2;
        user2.save().then(_ => {
          return res.status(200).json({ message: "contact deleted successfully!" })
        })
      })
    });
  }).catch(err => console.log(err));
});

// @route GET /suggestion
// @descript get list of suggested contacts
// @access Public
router.get("/suggestion", (req, res) => {
  User.find({}).then((users) => {
    // return all users for testing purpose
    const suggestions = users.map(({name, email, profile_picture}) => 
      ({name, email, profile_picture})
    );
    return res.json(suggestions);
  });
});

module.exports = router;