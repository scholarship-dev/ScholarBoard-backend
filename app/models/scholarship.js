const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScholarshipSchema = new Schema({
  name: { type: String, required: true },
  deadline: { type: Date, required: false },
  funding: { type: String, required: false },
  contactInfo: { type: String, required: false },
  description: { type: String, required: false },
  ethnicity: { type: String, required: false },
  educationLevel: { type: String, required: false },
  // GRADE LEVEL
  grade: { type: String, required: false },
  gpa: {type: String, required: false },
});

module.exports = mongoose.model('Scholarship', ScholarshipSchema);
