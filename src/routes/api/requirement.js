// API TO FETCH SCHOLARSHIP REQUIREMENTS
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient
const databaseName = 'ScholarBoardData1234'
let database
let scholarship_collection
let MongoURI = "mongodb://localhost:27017"


const Student = require('../../../models/student');
const Scholarship = require('../../../models/scholarship');

const current_user = {
  name: "Medi Assumani",
  ethnicity: "Balck/African American",
  gpa: 3.0,
  dob: "March 14 1999",
  grades: {
    gpa: 3.5,
    weightedGpa: 4.0
  }

}


MongoClient.connect(MongoURI, function(error, connected_database){
  if(error) throw error
  if(!error){
    database = connected_database.db(databaseName)
    scholarship_collection = database.collection('scholarships')
  }
})

// GET ALL SCHOLARSHIPS
router.get('/scholarships', (req, res) => {
  console.log("hi");
  Scholarship.find()
    .then(scholarships => res.json(scholarships));
});


// LOOK FOR SCHOLARSHIPS THAT HAVE GPA 3.0 IN REQUIRMENTS FILED
router.get("/scolarship/3.0", (req, res) => {
  scholarship_collection.find().toArray(function(err, result){
    result.forEach(function(scholarship){
      curr_req = scholarship.requirements
      console.log(current_user.grades.gpa);
      if(curr_req.includes(`${toString(current_user.grades.gpa)}`)){
        console.log("This scholarship has a GPA Match");
      }else{
        console.log("No Match");
      }
    })
  })
});

module.exports = router;
