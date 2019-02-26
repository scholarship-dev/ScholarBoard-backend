const express = require('express');
const router = express.Router();
const Scholarship = require('../../models/scholarship');


// ENDPOINT TO GET ALL SCHOLARSHIP THAT MATCH STUDENT
router.get("/api/scholarships", function(req, res){
  var currentUser = req.user
  Scholarship.find({ $or: [ { gpa: { $lte: currentUser.gpa}}, { ethnicity: currentUser.ethnicity}, {educationLevel: currentUser.educationLevel} ] })
    .then( (scholarships) => {
      res.send(scholarships)
    })
    .catch( (err) => {
      res.send(err)
    })
})

// ENDPOINT TO GET A SINGLE SCHOLARSHIP
router.get("/api/scholarships/:id", function(req, res){
  Scholarship.find( {_id: req.params.id} )
    .then( (scholarship) => {
      res.send(scholarship)
    })
    .catch( (err) => {
      throw err
    })
})


module.exports = router
