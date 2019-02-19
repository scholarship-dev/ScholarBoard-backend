/* eslint-disable camelcase */
/* eslint-disable no-undef */
// API TO FETCH SCHOLARSHIP REQUIREMENTS
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient
const tokenize = require("../../helpers/tokenize")
const databaseName = 'ScholarBoardData1234'
let database
let scholarship_collection
let MongoURI = 'mongodb://localhost:27017'
const Student = require('../../models/student');
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
  }

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

// GET ALL SCHOLARSHIPS WITH AT LEAST A GPA OF 3.5 AND WEIGHTED GPA OF 4.0
router.get('/:user/:scholarships', (req, res) => {
  Scholarship.find({ gpa: { $gte: 3.5 }, weightedGpa: { $gte: 4.0 } })
    .then(scholarships => res.json(scholarships));
}); 

// FUZZY SEARCH TO GET ALL SCHOLARSHIPS PER ETHNICITY
// FIND ANTHING 'LIKE' ETHNICITY
router.get('/scholarships/:ethnicity', (req, res) => {
  const ethnicity = new RegExp(req.params.ethnicity + '/i')
  Scholarship.find({ ethnicity })
    .then(scholarships => res.json(scholarships));
})

// USE THIS ROUTE FOR TESTING PURPOSES
router.get('/test', (req, res) => {

});


module.exports = router;
