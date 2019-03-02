//
// ─── SCHOLARSHIP CONTROLLER ─────────────────────────────────────────────────────
//

const Scholarship = require('./scholarship.model');

// GET ALL SCHOLARSHIPS
async function GetAllScholarships(req, res){
  res.send(await Scholarship.find())
}

// GET A SPECIFIC SCHOLARSHIP
async function GetScholarship(req, res){
  res.send( await Scholarship.find())
}

// GET SCHOLARSHIP BY ETHNICITY
async function GetScholarshipEthnicity(req, res){

}

// GET SCHOLARSHIP BY DATE
async function GetScholarshipDate(req, res){

}

module.exports = {
  GetAllScholarships,
  GetScholarship,
  GetScholarshipEthnicity,
  GetScholarshipDate, 
};