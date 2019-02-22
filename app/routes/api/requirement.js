//
// ─── API FOR SCHOLARSHIP DATA ───────────────────────────────────────────────────
//

/* eslint-disable camelcase */
/* eslint-disable no-undef */
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
  },
};

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

// FUZZY SEARCH TO GET ALL SCHOLARSHIPS BY ETHNICITY
// FIND ANTHING 'LIKE' ETHNICITY
router.get('/scholarships/:ethnicity', (req, res) => {
  const ethnicity = new RegExp(req.params.ethnicity); // '/i'
  Scholarship.find({ ethnicity })
    .then(scholarships => res.json(scholarships));
}); 

// FUZZY SEARCH TO GET ALL  SCHOLARSHIPS BY DEADLINE
// deadline format: YYYY-MM-DD
// NOT TESTED
router.get('/scholarships/:deadline', (req, res) =>  {
  let deadlineDate = new Date(req.params.deadline);
  // { $dateFromString: {
  //   dateString: toString(deadline),
  // }}
  Scholarship.find({ deadline: deadlineString });
}); 

// THIS ROUTE SHOULD BE AT THE BOTTOM AS IT HAS 2 VARIABLES
// COULD REGISTER ALL ROUTES WITH 2 PARAMATERS AS VARIABLE ONES
// GET ALL SCHOLARSHIPS WITH AT LEAST A GPA OF 3.5 AND WEIGHTED GPA OF 4.0
router.get('/scholarships/:user', (req, res) => {
  Scholarship.find({ gpa: { $gte: 3.5 }, weightedGpa: { $gte: 4.0 } })
    .then(scholarships => res.json(scholarships));
});

// USE THIS ROUTE FOR TESTING PURPOSES
router.get('/test', (req, res) => {
});


module.exports = router;
