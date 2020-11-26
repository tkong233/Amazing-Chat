const express = require("express");
const router = express.Router();

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
      // let contacts = findUsers(contactsEmail);
      User.find({
        email: { $in: emails },
      })
        .then((contacts) => {
          let statusList = [];
          contacts.forEach(
            ({ name, profile_picture, status }) =>
              status.forEach((statusData) => {
                statusList.push({ name, profile_picture, statusData });
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

module.exports = router;
