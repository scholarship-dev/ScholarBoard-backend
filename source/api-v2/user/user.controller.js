//
// ─── USER CONTROLLER ────────────────────────────────────────────────────────────
//

const Scholarship = require('./scholarship.model');
const User = require('../user/user.model');

// RETURNS ALL MATCHING SCHOLARSHIPS ACCORDING TO USER DATA
async function MatchScholarship(req, res) {
  const currentUser = req.user;
  const scholarships = await Scholarship.find({ 
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
  })

  const user = await User.findOne({ email: currentUser.email });
  return res.status(200).send({ scholarships, user });
}

module.exports = {
  MatchScholarship,
};