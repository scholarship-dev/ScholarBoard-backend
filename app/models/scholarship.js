const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScholarshipSchema = new Schema({
  name: { type: String, required: true },
  deadline: { type: String},
  funding: { type: String},
  contactInfo: { type: String},
  description: { type: String},
  ethnicity: { type: String}, // hispanic, native american, tec..
  educationLevel: { type: String}, // high scool, college, etc...
  grade: { type: String}, // junior, senior, ect...
  gpa: {type: Number}
});

module.exports = mongoose.model('Scholarship', ScholarshipSchema);
