/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Scholarship = require('../../models/scholarship');

/* ENDPOINT TO GET:
    - SCHOLARSHIPS THAT MATCH THE STUDENT PROFILE
    - CURRENT USER DATA TO RENDER ON DASHBOARD
    - TESTED 
*/

// HAS TO BE SET UP THIS WAY AS THE 4 SCHOLARSHIP REQUIREMENTS ARE NOT NECESSARY
router.get('/dashboard', (req, res) => {
  const currentUser = req.user
  console.log(currentUser);
  Scholarship.find({ 
    $or: 
      [ 
        // ALL PAIRS
        { $and: 
         [ { gpa: { $lte: currentUser.gpa } },
           { ethnicity: currentUser.ethnicity } ] },
        { $and: 
          [ { gpa: { $lte: currentUser.gpa } },
            { educationLevel: currentUser.educationLevel } ] },
        { $and: 
          [ { gpa: { $lte: currentUser.gpa } },
            { grade: currentUser.grade} ] },
        { $and: 
          [ { ethnicity: currentUser.ethnicity },
            { educationLevel: currentUser.educationLevel } ] },
        { $and: 
          [ { ethnicity: currentUser.ethnicity },
            { grade: currentUser.grade} ] },
        { $and: 
          [ { educationLevel: currentUser.educationLevel },
            { grade: currentUser.grade} ] },
        // ALL TRIPLETS
        { $and: 
          [ { gpa: { $lte: currentUser.gpa } },
            { ethnicity: currentUser.ethnicity },
            { educationLevel: currentUser.educationLevel } ] },
        { $and: 
          [ { gpa: { $lte: currentUser.gpa } },
            { ethnicity: currentUser.ethnicity },
            { grade: currentUser.grade} ] },
        { $and: 
          [ { gpa: { $lte: currentUser.gpa } },
            { educationLevel: currentUser.educationLevel },
            { grade: currentUser.grade} ] },
        { $and: 
          [ { ethnicity: currentUser.ethnicity },
            { educationLevel: currentUser.educationLevel },
            { grade: currentUser.grade} ] },
        // ALL FOUR
        { $and: 
          [ { gpa: { $lte: currentUser.gpa } },
            { ethnicity: currentUser.ethnicity },
            { educationLevel: currentUser.educationLevel },
            { grade: currentUser.grade} ] },
      ] 
  }).then((scholarships) => {
    User.find({ email: currentUser.email })
      .then((user) => {
        res.status(200).send({ scholarships, user });
      }).catch((error) => {
        res.status(400).send({ error });
        console.log(error);
      });
  })
    .catch((error) => {
      res.status(400).send({ error });
      console.log(error);
    });
});

module.exports = router;
