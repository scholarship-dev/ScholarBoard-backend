const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScholarshipSchema = new Schema({
  name: { type: String, required: true },
  deadline: { type: Date, required: true },
  funding: { type: Number, required: true },
  contactInfo: { type: String, required: true},
  requirements: { 
    ethnicity: { type: String, required: false},
    sex: { type: String, required: false},
    gpa: { type: Number, required: false },
    weightedGpa: { type: Number, required: false}, 
    achievements: { type: String, required: false}, 
    lowIncome: { type: Boolean, required: false }
  }
});

module.exports = mongoose.model("Scholarship", ScholarshipSchema);