"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ScholarshipSchema = new mongoose_1.Schema({
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
const Scholarship = mongoose_1.model("Scholarship", ScholarshipSchema);
exports.default = Scholarship;
