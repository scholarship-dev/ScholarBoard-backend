import { Schema, model } from "mongoose";

const ScholarshipSchema = new Schema({
  name: { type: String, required: true },
  deadline: { type: Date, required: false },
  funding: { type: String, required: false },
  contactInfo: { type: String, required: false },
  description: { type: String, required: false },
  ethnicity: { type: String, required: false },
  educationLevel: [{ type: String, required: false }],
  grade: { type: String, required: false },
  gpa: { type: String, required: false }
});

const Scholarship = model("Scholarship", ScholarshipSchema);

export default Scholarship
