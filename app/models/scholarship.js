const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScholarshipSchema = new Schema({
  name: { type: String, required: true },
  deadline: { type: Date, required: true },
  funding: { type: String, required: true },
  contactInfo: { type: String, required: true },
  description: { type: String, required: true },
  ethnicity: { type: String, required: false },
  educationLevel: { type: String, required: false },
  // GRADE LEVEL
  grade: { type: String, required: true }, 
  gpa: {type: String, required: false }, 
});

module.exports = mongoose.model('Scholarship', ScholarshipSchema);
