"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Add validation
const UserSchema = new mongoose_1.Schema({
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    password: { type: String, select: true, trim: true },
    gpa: { type: Number, required: true, trim: true },
    ethnicity: { type: String, required: true, trim: true },
    educationLevel: { type: String, required: true, trim: true },
    grade: { type: String, required: true, trim: true }
});
const User = mongoose_1.model("User", UserSchema);
exports.default = User;
