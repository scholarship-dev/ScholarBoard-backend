// API TO FETCH SCHOLARSHIP REQUIREMENTS
const express = require('express');
const router = express.Router();

const Student = require('../../../models/student');
const Scholarship = require('../../../models/scholarship');

// GET ALL SCHOLARSHIPS
router.get('/scholarships', (req, res) => {
  Scholarship.find()
    .then(scholarships => res.json(scholarships));
});

// LOOK FOR SCHOLARSHIPS THAT HAVE GPA 3.0 IN REQUIRMENTS FILED
router.get('/scholarship/3.0', (req, res) => {
  Scholarship.find({tags: new RegExp(req.params.value, '3.0')}, (err, f) => {
    if(err){
      console.log(err); 
    } else {
      res.json()
    }
  });
});

module.exports = router;