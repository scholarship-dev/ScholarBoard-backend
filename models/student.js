const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  ethnicity: { type: String, required: true },
  contactInfo: { type: String, required: true},
  secondaryEducation: { type: String, required: true}, 
  lowIncome: { type: Boolean, required: true},
  grades: {
    gpa: { type: Number, required: true},
    weightedGpa: { type: Number, required: false },
    achievments: { type: String, required: false}
  }
});

module.exports = mongoose.model("Student", StudentSchema);
