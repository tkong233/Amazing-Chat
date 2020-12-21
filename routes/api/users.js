const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const Validator = require("validator");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const config = require("./config");

const S3 = new AWS.S3(config.s3);

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateResetInput = require("../../validation/reset");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        question: req.body.question,
        answer: req.body.answer,
        profile_picture: req.body.profile_picture,
        failed_login_attempts: 0,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check if locked out
    // 1000 = 1s
    if (
      user.failed_login_attempts >= 3 &&
      Date.now() - user.failed_login_time < 300000
    ) {
      return res.status(400).json({
        email:
          "Your account has been locked due to excessive consecutive failed logins. Please try again 5 mins later.",
      });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // if login successful, update failed_login_attempts to zero
        user.failed_login_attempts = 0;
        user
          .save()
          .then((u) => console.log("updated login_failed_attempts to zero"))
          .catch((err) => console.log(err));

        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          date: user.date,
          profile_picture: user.profile_picture,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 1800, // 30 min in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        // password incorrect
        const failed_login_attempts = user.failed_login_attempts + 1;
        user.failed_login_attempts = failed_login_attempts;
        user.failed_login_time = Date.now();
        user
          .save()
          .then()
          .catch((err) => console.log(err));

        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// @route POST api/users/reset
// @desc Reset password for user
// @access Public
router.post("/reset", (req, res) => {
  // Form validation

  const { errors, isValid } = validateResetInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const question = req.body.question;
  const answer = req.body.answer;
  const password = req.body.password;

  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      errors.email = "Email is not registered";
      return res.status(400).json(errors);
    } else if (!Validator.equals(user.question, question)) {
      // console.log("Security question does not match record");
      return res
        .status(400)
        .json({ question: "Security question does not match record" });
    } else if (!Validator.equals(user.answer, answer)) {
      // console.log("Answer to security question does not match record");
      return res
        .status(400)
        .json({ answer: "Answer to security question does not match record" });
    } else {
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST /upload_profile_image/:email
// @desc upload profile image
// @access Private

const storage = multerS3({
  s3: S3,
  bucket: config.s3.Bucket,
  acl: "public-read",
  key: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage }).single("NonTextfile");

router.post("/upload_profile_image/:email", (req, res) => {
  const email = req.params.email;
  upload(req, res, (error) => {
    if (error) {
      console.log("errors", error);
    }
    User.findOne({ email: email }).then((user) => {
      if (!user) {
        return res.status(404).json({ usernotfound: "Can't find user profile" });
      }
      user.profile_picture = req.file.location;
      user
        .save()
        .then(() => console.log("updated user profile picture path"))
        .catch((err) => console.log(err));
      res.json({ user: user });
    })
    .catch(err => res.status(400).json(err));
  });
});

// @route DELETE api/users/profile/:email
// @desc Deactivate account
// @access Private
router.delete("/profile/:email", (req, res) => {
  const email = req.params.email;
  User.findOne({ email }).then((user) => {
    const contacts = user.contacts; // map to array of emails
    const contactEmails = contacts.map(({ email }) => ( email ));
    contactEmails.forEach((e) => {
      User.findOne({ email: e }).then(c => {
        const updatedContacts = removeContact(c.contacts, email);
        c.contacts = updatedContacts;
        c.save();
      })
    });
    Message.remove({ from: email }).then(_ => {
      Message.remove({ to: email}).then(_ => {
        User.deleteOne({ email }).then(_ => {
          return res.json({ message: 'success' });
        })
      })
    })
  });
});

// given a list of contacts [{email, pairId, ...}], remove the one whose email matched given email
const removeContact = (contacts, email) => {
  let index = -1;
  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].email === email) {
      index = i;
    }
  }
  if (index > -1) {
    contacts.splice(index, 1);
  }
  return contacts;
}

// @route POST api/users/status
// @desc Post status
// @access Private
router.post("/status/:email", (req, res) => {
  const email = req.params.email;
  // if an image is uploaded
    // const file = req.files.file;
    upload(req, res, (error) => {
      if (error) {
        console.log("errors", error);
      }
      User.findOne({ email }).then((user) => {
        if (!user) {
          return res
            .status(404)
            .json({ usernotfound: "Can't find user profile" });
        }
        const statusId = new mongoose.Types.ObjectId();
        const image = req.file.location;
        const time = Date.now();
        // if text is uploaded
        // if (req.body) {
        const text = req.body.text;
        const newStatus = {
            statusId,
            image,
            text,
            time,
          };
        user.status.push(newStatus);
        user
          .save()
          .then((_) => {
            return res
              .status(200)
              .json({ message: "status added successfully" });
          })
          .catch((err) => console.log(err));
        })
      })
  // }
});

module.exports = router;
