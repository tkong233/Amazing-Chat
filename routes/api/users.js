const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const Validator = require("validator");

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

  User.findOne({ email: req.body.email }).then(user => {
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
        failed_login_attempts: 0
      });
      console.log(newUser);

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
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
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }

      // Check if locked out
      // 1000 = 1s
      if (user.failed_login_attempts >= 3 && (Date.now() - user.failed_login_time) < 300000) {
          return res.status(400).json({email: "Your account has been locked due to excessive consecutive failed logins. Please try again 5 mins later."})
      }
  
      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
            // if login successful, update failed_login_attempts to zero
            user.failed_login_attempts = 0;
            user.save()
                .then(u => console.log("updated login_failed_attempts to zero"))
                .catch(err => console.log(err));

            // User matched
            // Create JWT Payload
            const payload = {
                id: user.id,
                name: user.name
            };
    
            // Sign token
            jwt.sign(
                payload,
                keys.secretOrKey,
                {
                    expiresIn: 1800 // 30 min in seconds
                },
                (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                }
          );
        } else { // password incorrect
            const failed_login_attempts = user.failed_login_attempts + 1;
            user.failed_login_attempts = failed_login_attempts;
            user.failed_login_time = Date.now();
            user.save().then().catch(err => console.log(err));

            return res.status(400).json({passwordincorrect: "Password incorrect"});
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
  
    User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
        errors.email = "Email is not registered";
        return res.status(400).json(errors);
    } else if (!Validator.equals(user.question, question)) {
        console.log("Security question does not match record");
        return res.status(400).json({ question: "Security question does not match record" });
    } else if (!Validator.equals(user.answer, answer)) {
        console.log("Answer to security question does not match record");
        return res.status(400).json({ answer: "Answer to security question does not match record" });
    } else {
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
        });
    }
    });
  });

module.exports = router;
