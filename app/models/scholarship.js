const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScholarshipSchema = new Schema({
  name: { type: String, required: true },
  deadline: { type: String},
  funding: { type: String},
  contactInfo: { type: String},
  description: { type: String},
  ethnicity: { type: String},
  grade: { type: String},
  gpa: {type: Number}
});

module.exports = mongoose.model('Scholarship', ScholarshipSchema);
