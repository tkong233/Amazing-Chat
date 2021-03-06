const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../../models/User");

// @route GET /status
// @descript get a list of contacts for the user
// @access Public
router.get("/status/:email", (req, res) => {
  const emailParam = req.params.email;
  User.findOne({ email: emailParam })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      let emails = user.contacts.map(({ email }) => email);
      const seen = user.seen;
      // let contacts = findUsers(contactsEmail);
      User.find({
        email: { $in: emails },
      })
        .then((contacts) => {
          let statusList = [];
          contacts.forEach(
            ({ name, profile_picture, status }) =>
              status.forEach((statusData) => {
                if (!seen.includes(statusData.statusId.toString())) {
                  statusList.push({ name, profile_picture, statusData });
                }
              })
            //   statusList.push({ name, profile_picture, email, ...getPairIdAndTime(contacts, emailParam) })
          );
          statusList.sort((a, b) => b.statusData.time - a.statusData.time);
          return res.status(200).json(statusList);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => console.log(err));
});

// @route POST /status/:email/seen/:id
// @descript get a list of contacts for the user
// @access Public
router.post("/status/seen/:email/:id", (req, res) => {
  const emailParam = req.params.email;
  const idParam = req.params.id;
  User.findOne({ email: emailParam })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      user.seen.push(idParam);
      user
        .save()
        .then(() => console.log("updated user status seen list"))
        .catch((err) => console.log(err));
      return res.status(200).json(user);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
