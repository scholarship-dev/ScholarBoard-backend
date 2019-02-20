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
const body = "The ¡Adelante! U.S. Education Leadership Fund is a leadership development, non-profit organization dedicated to Hispanic college students. Our mission is to inspire the best and brightest Latino students to graduate and lead through scholarships, internships, and leadership training. Must be a junior or senior university classification by the fall semester. Open only to Chicagoland partnering universities. Applicants must be of Hispanic descent and must be a US citizen or legal permanent resident with a GPA of 3.5 or higher on a 4.0 scale. For more information or to apply, please visit the scholarship provider's website."

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
// TESTED
router.get('/scholarships', (req, res) => {
  Scholarship.find()
    .then(scholarships => res.json(scholarships));
});

// FUZZY SEARCH TO GET ALL SCHOLARSHIPS PER ETHNICITY
// FIND ANTHING 'LIKE' ETHNICITY
// TESTED
router.get('/scholarships/:ethnicity', (req, res) => {
  const ethnicity = new RegExp(req.params.ethnicity + '/i')
  console.log(ethnicity)
  Scholarship.find({ ethnicity })
    .then(scholarships => res.json(scholarships));
})

// THIS ROUTE SHOULD BE AT THE BOTTOM AS IT HAS 2 VARIABLES
// COULD REGISTER ALL ROUTES WITH 2 PARAMATERS AS VARIABLE ONES
// GET ALL SCHOLARSHIPS WITH AT LEAST A GPA OF 3.5 AND WEIGHTED GPA OF 4.0
router.get('/:user/:scholarships', (req, res) => {
  Scholarship.find({ gpa: { $gte: 3.5 }, weightedGpa: { $gte: 4.0 } })
    .then(scholarships => res.json(scholarships));
});

// USE THIS ROUTE FOR TESTING PURPOSES
router.get('/test', (req, res) => {
  tokenize.extractGPA(body)
});


module.exports = router;
