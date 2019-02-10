const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScholarshipSchema = new Schema({
  name: { type: String, required: true },
  deadline: { type: Date, required: true },
  funding: { type: Number, required: true },
  contactInfo: { type: String, required: true},
  // ALL REQUIREMENTS WILL BE INDIVIDUALLY QUERIED FROM THE RAW TEXT
  requirements: { type: String, required: true}
});

module.exports = mongoose.model("Scholarship", ScholarshipSchema);