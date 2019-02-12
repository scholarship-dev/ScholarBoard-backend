/* eslint-disable camelcase */
/* eslint-disable no-undef */
// API TO FETCH SCHOLARSHIP REQUIREMENTS
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient
const databaseName = 'ScholarBoardData1234'
let database
let scholarship_collection
let MongoURI = 'mongodb://localhost:27017'


const Student = require('../../../models/student');
const Scholarship = require('../../../models/scholarship');

const dummyStudent = {
  name: 'Medi Assumani',
  race: 'Balck/African American'
}


MongoClient.connect(MongoURI, (error, connected_database) => {
  if (error) throw error;
  if (!error) {
    database = connected_database.db(databaseName)
    scholarship_collection = database.collection('scholarships'); 
  }
})

// GET ALL SCHOLARSHIPS
router.get('/scholarships', (req, res) => {
  Scholarship.find()
    .then(scholarships => res.json(scholarships));
});

// LOOK FOR SCHOLARSHIPS THAT HAVE GPA 3.0 IN REQUIRMENTS FILED
router.get('/scolarship/3.0', (req, res) => {
  scholarship_collection.find().toArray((err, result) => {
    result.forEach((scholarship) => {
      curr_req = scholarship.requirements
      if (curr_req.includes('3.0')) {
        console.log('This scholarship has 3.0');
      }
    });
  });
});

module.exports = router;
