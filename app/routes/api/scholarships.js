/* eslint-disable max-len */

const express = require('express');

const router = express.Router();
const Scholarship = require('../../models/scholarship');


<<<<<<< HEAD
// ENDPOINT TO GET ALL SCHOLARSHIP THAT MATCH STUDENT
router.get('/api/scholarships', (req, res) => {
  let currentUser = req.user;
  Scholarship.find({ $or: [{ gpa: { $lte: currentUser.gpa } }, { ethnicity: currentUser.ethnicity }, { educationLevel: currentUser.educationLevel }] })
    .then((scholarships) => {
      res.send(scholarships)
    })
    .catch((err) => {
      res.send(err);
    });
});

// ENDPOINT TO GET A SINGLE SCHOLARSHIP
router.get('/api/scholarships/:id', (req, res) => {
  Scholarship.find( {_id: req.params.id })
    .then((scholarship) => {
      res.send(scholarship);
    })
    .catch((err) => {
      throw err;
    })
})

// ENDPOINT TO DO A FUZZY SEARCH TO GET ALL SCHOLARSHIPS BY ETHNICITY
router.get('/scholarships/race/:ethnicity', (req, res) => {
  const ethnicity = new RegExp(req.params.ethnicity); // '/i'
  Scholarship.find({ ethnicity })
    .then(scholarships => res.json(scholarships));
});

// ENDPOINT TO DO A RANGE QUERY FOR SCHOLARSHIP BY SEPCIFIC DATE
router.get('/scholarships/deadline/:dateYear/:dateMonth/:dateDay', (req, res) => {
  Scholarship.find({deadline: {$gte: new Date(`${req.params.dateYear  }-${  req.params.dateMonth  }-${  req.params.dateDay}`)}})
    .then(scholarships => res.json(scholarships))
});


module.exports = router;
