const Scholarship = require('./scholarship.model');
const User = require('../user/user.model');

// GET ALL SCHOLARSHIPS
async function GetAllScholarships(req, res){
  res.send(await Scholarship.find())
}

// RETURNS ALL MATCHING SCHOLARSHIPS ACCORDING TO USER DATA
async function MatchScholarship(req, res) {
  const currentUser = req.user;
  res.send(await Scholarship.find({
    $or: 
      [ 
        // ALL PAIRS
        { $and: 
         [ { gpa: { $lte: currentUser.gpa } },
           { ethnicity: currentUser.ethnicity } ] },
        { $and: 
          [ { gpa: { $lte: currentUser.gpa } },
            { educationLevel: currentUser.educationLevel } ] },
        { $and: 
          [ { gpa: { $lte: currentUser.gpa } },
            { grade: currentUser.grade} ] },
        { $and: 
          [ { ethnicity: currentUser.ethnicity },
            { educationLevel: currentUser.educationLevel } ] },
        { $and: 
          [ { ethnicity: currentUser.ethnicity },
            { grade: currentUser.grade} ] },
        { $and: 
          [ { educationLevel: currentUser.educationLevel },
            { grade: currentUser.grade} ] },
        // ALL TRIPLETS
        { $and: 
          [ { gpa: { $lte: currentUser.gpa } },
            { ethnicity: currentUser.ethnicity },
            { educationLevel: currentUser.educationLevel } ] },
        { $and: 
          [ { gpa: { $lte: currentUser.gpa } },
            { ethnicity: currentUser.ethnicity },
            { grade: currentUser.grade} ] },
        { $and: 
          [ { gpa: { $lte: currentUser.gpa } },
            { educationLevel: currentUser.educationLevel },
            { grade: currentUser.grade} ] },
        { $and: 
          [ { ethnicity: currentUser.ethnicity },
            { educationLevel: currentUser.educationLevel },
            { grade: currentUser.grade} ] },
        // ALL FOUR
        { $and: 
          [ { gpa: { $lte: currentUser.gpa } },
            { ethnicity: currentUser.ethnicity },
            { educationLevel: currentUser.educationLevel },
            { grade: currentUser.grade} ] },
      ] 
  }).then((scholarships) => {
    User.find({ email: currentUser.email })
      .then((user) => {
        res.status(200).send({ scholarships, user });
      }).catch((error) => {
        res.status(400).send({ error });
        console.log(error);
      });
  }));
}

//  SEND SPECIFIC CHARACTER
async function GetCharacter(req, res) {
  res.json(await Model.Character.findById(req.params.id));
}

module.exports = {
  GetAllScholarships,
  MatchScholarship,
};