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
const ethnicity_keywords = ["indigenous", "white peope", "African Americans", "Jewish People", "Asian people", "Arabs", "Native Americans", "Black people", "pacific islander", "Irannian people", "Native Hawaiians", "Alaska Natives", "Latino", "Multiracial", "Hispanic and Latino Americans", "Mexicans", "Pacific Islands Americans", "Irish People"]
const body = "The ¡Adelante! U.S. Education Leadership Fund is a leadership development, non-profit organization dedicated to Hispanic college students. Our mission is to inspire the best and brightest Latino students to graduate and lead through scholarships, internships, and leadership training. Must be a junior or senior university classification by the fall semester. Open only to Chicagoland partnering universities. Applicants must be of Hispanic descent and must be a US citizen or legal permanent resident with a GPA of 3.0 or higher on a 4.0 scale. For more information or to apply, please visit the scholarship provider's website."

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
  const str = "medi is a hispanic man"
  const new_str = str.replace(/\s/g, "")
  console.log(new_str);
  const key = "hispanic"
  let target
  const start_index = new_str.indexOf(key)
  const end_index = (start_index + key.length)
  console.log("Lenght of sentence : " + new_str.length);
  console.log("length of key : " + key.length);
  console.log("start index : "+ start_index);
  console.log("End index : "+ end_index);
  if (str.includes(key.toLowerCase()) || str.includes(key.toUpperCase())){
    target = new_str.slice(start_index, end_index)
    console.log("Char at start index : " + new_str.charAt(start_index));
    console.log("Char at end index : "+ new_str.charAt(end_index));

    console.log(target);
  }
  // scholarship_collection.find().toArray((err, result) => {
  //   result.forEach((scholarship) => {
  //     curr_req = scholarship.requirements
  //     console.log(current_user.grades.gpa);
  //     if(curr_req.includes(`${toString(current_user.grades.gpa)}`)){
  //       console.log("This scholarship has a GPA Match");
  //     }else{
  //       console.log("No Match");
  //     }
  //   });
  // });
});


module.exports = router;
