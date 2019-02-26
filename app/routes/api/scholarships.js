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


module.exports = router
