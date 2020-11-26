const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Load User model
const User = require("../../models/User");

// @route GET /cotacts
// @descript get a list of contacts for the user
// @access Public
router.get("/contacts/:email", (req, res) => {
  const emailParam = req.params.email;
  User.findOne({ email : emailParam }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "user not found"});
    }
    let emails = user.contacts.map(({ email }) => ( email ));
    // let contacts = findUsers(contactsEmail);
    User.find({
      email : { "$in": emails }
    }).then(contacts =>  {
      const contactsWithIdAndTime = contacts.map(({ name, profile_picture, email, contacts }) => 
        ({ name, profile_picture, email, ...getPairIdAndTime(contacts, emailParam) })
      )
      return res.status(200).json(contactsWithIdAndTime);
    }).catch(err => {
      console.log(err);
    })
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
      let contacts1 = user1.contacts;
      contacts1.push({
        pairId,
        email: email2,
        lastInteractTime: Date.now()
      });
      user1.contacts = contacts1;
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
              // get and return user1's contacts info
              let emails = contacts1.map(({ email }) => ( email ));
              User.find({
                email : { "$in": emails }
              }).then(contacts =>  {
                const contactsWithIdAndTime = contacts.map(({ name, profile_picture, email, contacts }) => 
                  ({ name, profile_picture, email, ...getPairIdAndTime(contacts, email1) })
                )
                return res.status(200).json(contactsWithIdAndTime);
              }).catch(err => {
                console.log(err);
              })
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
    let updatedContacts1 = contacts1.filter(c => c.email != email2);
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
          let emails = updatedContacts1.map(({ email }) => ( email ));
          User.find({
            email : { "$in": emails }
          }).then(contacts =>  {
            const contactsWithIdAndTime = contacts.map(({ name, profile_picture, email, contacts }) => 
              ({ name, profile_picture, email, ...getPairIdAndTime(contacts, email1) })
            )
            return res.status(200).json(contactsWithIdAndTime);
          }).catch(err => {
            console.log(err);
          })
        })
      })
    });
  }).catch(err => console.log(err));
});

// @route GET /suggestion
// @descript get list of suggested contacts
// @access Public
router.get("/suggestion/:email", (req, res) => {
  const email = req.params.email;
  User.find({}).then((allUsers) => {
    if (!allUsers) {
      return res.status(404).json({ message: "no suggestion found" });
    }
    // return all users for testing purpose
    let suggestions = allUsers.map(({ name, email, profile_picture }) => 
      ({ name, email, profile_picture })
    );
    User.findOne({ email }).then((user) => {
      if (!user) {
        return res.status(404).json({ message : "user not found" });
      }

      const contacts = user.contacts.map(({ email }) => 
        ({ email })
      );
      suggestions = suggestions.filter((c) => {
        return !containsUser(contacts, c.email) && c.email != email;
      });

      return res.status(200).json(suggestions);
    });
  });
});

// @params contact - an array of emails for contacts
// @params email - a email
// @return whether the user with the specified email exist in the contact list
containsUser = (contacts, email) => {
  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].email === email) {
      return contacts[i];
    }
  }
  return null;
}


getUser = (email) => {
  User.findOne({ email })
    .then(res => { return res })
    // .then(res => { console.log(email, res) })
    .catch(err => { console.log(err) })
}

// @param - meails: an array of emails
// @return an array of users with specified emails
findUsers = (emails) => {
  User.find({
    email : { "$in": emails }
  }).then(res =>  {
    return res;
  }).catch(err => {
    console.log(err);
  })
}

// @param - emails: an array of emails of the contacts for the user
// @param - email: email for the user
// @return - array of contacts [...user, pairId]
findContacts = (emails, email) => {
  User.find({
    email : { "$in": emails }
  }).then(res =>  {
    const contacts = res.map((user) => {
      let c = containsUser(user, email);
      let pairId = c ? c.pairId : null;
      return {...user, pairId};
    })
    return contacts;
  }).catch(err => {
    console.log(err);
  })
}

// @param - contacts: array of contacts for user2 [{pairId, email, lastInteractTime}]
// @param - email: email for a user1
// @param - pairId between user1 and user2
getPairIdAndTime = (contacts, email) => {
  const entry = containsUser(contacts, email);
  return entry ? { pairId: entry.pairId, lastInteractTime: entry.lastInteractTime } : {}
}

module.exports = router;