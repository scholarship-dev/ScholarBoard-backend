//
// ─── SCHOLARSHIP CONTROLLER ─────────────────────────────────────────────────────
//

const Scholarship = require('./scholarship.model');

// GET ALL SCHOLARSHIPS
async function GetAllScholarships(req, res) {
  const scholarships = await Scholarship.find();
  res.send(scholarships)
}

// GET A SPECIFIC SCHOLARSHIP
async function GetScholarship(req, res) {
  const scholarships = await Scholarship.find({id: req.params.id });
  res.send(scholarships);
}

// GET SCHOLARSHIP BY ETHNICITY
async function GetScholarshipEthnicity(req, res) {
  const ethnicity = new RegExp(req.params.ethnicity); // '/i'
  const scholarships = Scholarship.find({ ethnicity })
  res.send(scholarships);
}

// GET SCHOLARSHIP BY DATE
async function GetScholarshipDate(req, res) {
  const scholarships = Scholarship.find({deadline: {$gte: new Date(`${req.params.year  }-${  req.params.month  }-${  req.params.day}`)}})
  res.send(scholarships);
}

module.exports = {
  GetAllScholarships,
  GetScholarship,
  GetScholarshipEthnicity,
  GetScholarshipDate, 
};