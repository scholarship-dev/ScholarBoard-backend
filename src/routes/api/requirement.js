// API TO FETCH SCHOLARSHIP REQUIREMENTS
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient
const databaseName = 'ScholarBoardData1234'
let database
let scholarship_collection


const Student = require('../../../models/student');
const Scholarship = require('../../../models/scholarship');

const dummyStudent = {
  name: "Medi Assumani",
  race: "Balck/African American"
}


MongoClient.connect(process.env.MONGODB_URI, function(error, connected_database){
  //if(error) throw error
  console.log(error);
  if(!error){
    database = connected_database
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
  console.log("holla medi");
  scholarship_collection.find().toArray(function(err, result){
    // result.forEach(function(object){
    //   current_req = obj.requirements
    //   console.log(requirements);
    // })
  })
});

module.exports = router;
