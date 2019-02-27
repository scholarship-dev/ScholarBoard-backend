/* eslint-disable max-len */

const express = require('express');

const router = express.Router();
const Scholarship = require('../../models/scholarship');

// ENDPOINT TO GET ALL SCHOLARSHIPS FROM THE DB
router.get('/api/scholarships', function(req, res){
  var currentUser = req.user
  Scholarship.find()
    .then( (scholarhips) => {
      res.status(200).send(scholarhips)
    })
})

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
  const ethnicity = new RegExp(req.params.ethnicity); 
  Scholarship.find({ ethnicity })
    .then(scholarships => res.json(scholarships));
});

// ENDPOINT TO DO A RANGE QUERY FOR SCHOLARSHIP BY SEPCIFIC DATE
router.get('/scholarships/deadline/:dateYear/:dateMonth/:dateDay', (req, res) => {
  Scholarship.find({deadline: {$gte: new Date(`${req.params.dateYear  }-${  req.params.dateMonth  }-${  req.params.dateDay}`)}})
    .then(scholarships => res.json(scholarships))
});


module.exports = router;
