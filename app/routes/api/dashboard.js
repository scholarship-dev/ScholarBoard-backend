const express = require('express')
const router = express.Router()
const User = require('../../models/user')


/* ENDPOINT TO GET:
    - SCHOLARSHIPS THAT MATCH THE STUDENT PROFILE
    - CURRENT USER DATA TO RENDER ON DASHBOARD
*/
router.get('/api/dashboard', function(req, res){
  var currentUser = req.user
  Scholarship.find({ $or: [ { gpa: { $lte: currentUser.gpa}}, { ethnicity: currentUser.ethnicity}, {educationLevel: currentUser.educationLevel} ] })
    .then( (scholarships) => {
      User.find({ email: currentUser.email })
        .then( (user) => {
          res.status(200).send({ scholarhips: scholarhips , user: user })
        }).catch( (error) => {
          res.status(400).send({ error: error })
        })
    })
    .catch( (err) => {
      res.status(400).send( {error: err} )
    })
})




module.exports = router
