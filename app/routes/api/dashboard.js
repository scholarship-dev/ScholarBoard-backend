/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Scholarship = require('../../models/scholarship');

let currentUser = {
  gpa: '2.5',
  ethnicity: 'Hispanic',
  educationLevel: 'college',
  grade: 'senior'
}

/* ENDPOINT TO GET:
    - SCHOLARSHIPS THAT MATCH THE STUDENT PROFILE
    - CURRENT USER DATA TO RENDER ON DASHBOARD
*/
router.get('/dashboard', (req, res) => {
  // const currentUser = req.user
  // const currentUser = dummyUser
  // { ethnicity: currentUser.ethnicity }, {educationLevel: currentUser.educationLevel}
  console.log(currentUser);
  Scholarship.find({
    $or: [
      { gpa: { $lte: currentUser.gpa } },
      { ethnicity: currentUser.ethnicity},
      { educationLevel: currentUser.educationLevel },
    ],
  }).then((scholarships) => {
    User.find({ email: currentUser.email })
      .then((user) => {
        res.status(200).send({ scholarhips, user });
      }).catch((error) => {
        res.status(400).send({ error });
      });
  })
    .catch((error) => {
      res.status(400).send({ error } );
    });
});


module.exports = router;
