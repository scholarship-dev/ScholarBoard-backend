const express = require('express');
const router = express.Router();
const Scholarship = require('../../models/scholarship');


// ENDPOINT TO GET ALL SCHOLARSHIP
router.get("/api/scholarships", function(req, res){
  Scholarship.find({})
    .then( (scholarhips) => {
      res.send(scholarhips)
    })
})



module.exports = router
