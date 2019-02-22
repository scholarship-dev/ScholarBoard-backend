//
// ─── API FOR SCHOLARSHIP DATA ───────────────────────────────────────────────────
//

/* eslint-disable camelcase */
/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient

// IMPORTS
const Student = require('../../models/student');
const Scholarship = require('../../models/scholarship');

let database;
const databaseName = 'ScholarBoardData1234';
let MongoURI = 'mongodb://localhost:27017';

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
router.get('/scholarships/race/:ethnicity', (req, res) => {
  const ethnicity = new RegExp(req.params.ethnicity); // '/i'
  Scholarship.find({ ethnicity })
    .then(scholarships => res.json(scholarships));
}); 

// RANGE QUERY FOR SCHOLARSHIP BY SEPCIFIC DATE
// deadline format: YYYY-MM-DD
router.get('/scholarships/deadline/:dateYear/:dateMonth/:dateDay', (req, res) => {
  // let deadline = new RegExp(req.params.deadline);
  Scholarship.find({deadline: {$gte: new Date(`${req.params.dateYear  }-${  req.params.dateMonth  }-${  req.params.dateDay}`)}})
    .then(scholarships => res.json(scholarships))
}); 

// THIS ROUTE SHOULD BE AT THE BOTTOM AS IT HAS 2 VARIABLES
// GET ALL SCHOLARSHIPS WITH AT LEAST A GPA OF 3.5 AND WEIGHTED GPA OF 4.0
router.get('/scholarships/account/:user', (req, res) => {
  Scholarship.find({ gpa: { $gte: 3.5 }, weightedGpa: { $gte: 4.0 } })
    .then(scholarships => res.json(scholarships));
});

// USE THIS ROUTE FOR TESTING PURPOSES
router.get('/test', (req, res) => {
});


module.exports = router;
