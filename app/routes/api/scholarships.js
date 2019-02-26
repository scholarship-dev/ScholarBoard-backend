const express = require('express');
const router = express.Router();
const Scholarship = require('../../models/scholarship');


// ENDPOINT TO GET ALL SCHOLARSHIPS FROM THE DB
router.get("/api/scholarships", function(req, res){
  var currentUser = req.user
  Scholarship.find()
    .then( (scholarhips) => {
      res.status(200).send(scholarhips)
    })
})

// ENDPOINT TO GET A SINGLE SCHOLARSHIP FROM THE DB
router.get("/api/scholarships/:id", function(req, res){
  Scholarship.findById(req.params.id)
    .then( (scholarship) => {
      res.status(200).send(scholarship)
    })
    .catch( (err) => {
      res.status(200).send( {error: err} )
    })
})

// FUZZY SEARCH TO GET ALL SCHOLARSHIPS BY ETHNICITY
// FIND ANTHING 'LIKE' ETHNICITY
router.get('/scholarships/race/:ethnicity', (req, res) => {
  const ethnicity = new RegExp(req.params.ethnicity); // '/i'
  Scholarship.find({ ethnicity })
    .then(scholarships => res.json(scholarships));
});

// RANGE QUERY FOR SCHOLARSHIP BY SEPCIFIC DATE
// deadline format: YYYY-MM-DD
router.get('/scholarships/deadline/:dateYear/:dateMonth/:dateDay', (req, res) => {
  Scholarship.find({deadline: {$gte: new Date(`${req.params.dateYear  }-${  req.params.dateMonth  }-${  req.params.dateDay}`)}})
    .then(scholarships => res.json(scholarships))
});



module.exports = router
