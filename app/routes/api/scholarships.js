const express = require('express');
const router = express.Router();
const Scholarship = require('../../models/scholarship');


// DUMMY USER DATA
const current_user = {
  name: "Medi Assumani",
  ethnicity: "Hispanic",
  gpa: 3.0,
  dob: "March 14 1999",
  grades: {
    gpa: 3.5,
    weightedGpa: 4.0
  },
};



// ENDPOINT TO GET ALL SCHOLARSHIP
router.get("/api/scholarships", function(req, res){
  Scholarship.find({ gpa: { $lte: current_user.grades.gpa } })
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
