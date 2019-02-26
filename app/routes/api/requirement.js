//
// ─── API FOR SCHOLARSHIP DATA ───────────────────────────────────────────────────
//

/* eslint-disable camelcase */
/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient

// IMPORTS
const Scholarship = require('../../models/scholarship');
const tokenize = require("../../helpers/tokenize")

let database;
const databaseName = 'ScholarBoardData1234';
let MongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
let body = "The ¡Adelante! U.S. Education Leadership Fund is a leadership development, non-profit organization dedicated to Hispanic college students. Our mission is to inspire the best and brightest Latino students to graduate and lead through scholarships, internships, and leadership training. Must be a junior or senior university classification by the fall semester. Open only to Chicagoland partnering universities. Applicants must be of Hispanic descent and must be a US citizen or legal permanent resident with a GPA of 2.5 or higher on a 4.0 scale. For more information or to apply, please visit the scholarship provider's website."

// DUMMY USER DATA
const current_user = {
  name: 'Medi Assumani',
  ethnicity: 'Hispanic',
  gpa: 3.0,
  dob: 'March 14 1999',
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
router.get('/scholarships/race/:ethnicity', (req, res) => {
  const ethnicity = new RegExp(req.params.ethnicity); // '/i'
  Scholarship.find({ ethnicity })
    .then(scholarships => res.json(scholarships));
});

// RANGE QUERY FOR SCHOLARSHIP BY SEPCIFIC DATE
// deadline format: YYYY-MM-DD
router.get('/scholarships/deadline/:dateYear/:dateMonth/:dateDay', (req, res) => {
  Scholarship.find({deadline: {$gte: new Date(`${req.params.dateYear  }-${  req.params.dateMonth  }-${  req.params.dateDay}`)}})
    .then(scholarships => res.json(scholarships))
});

// RANGE QUERY TO MATCH SCHOLARSHIPS WITH USER DATA
router.get('/scholarships/account/:user', (req, res) => {
  Scholarship.find({ gpa: { $gte: 3.5 }, weightedGpa: { $gte: 4.0 } })
    .then(scholarships => res.json(scholarships));
});

// USE THIS ROUTE FOR TESTING PURPOSES
router.get('/test', (req, res) => {
  tokenize.extractGPA(body)
});


module.exports = router;
