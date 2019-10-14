"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uniqueValidator = require("mongoose-unique-validator");
// Add validation
const UserSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true, trim: true, minlength: 1 },
    lastName: { type: String, required: true, trim: true, minlength: 1 },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: val => {
            if (!validator_1.default.isEmail(val)) {
                throw new Error("This is not a valid email!");
            }
            return true;
        }
    },
    password: { type: String, select: true, trim: true, minlength: 6 },
    gpa: { type: Number, required: true, trim: true },
    ethnicity: { type: String, required: true, trim: true },
    educationLevel: { type: String, required: true, trim: true }
});
UserSchema.pre("save", async function hash(next) {
    const user = this;
    const { password } = user;
    const hashedPassword = await bcrypt_1.default.hash(password, 7);
    user.password = hashedPassword;
    next();
});
UserSchema.statics.findLoginInfo = async function ({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) {
        return { message: "Your information is not correct" };
    }
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Unable to login");
    }
    return user;
};
const User = mongoose_1.model("User", UserSchema);
UserSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });
exports.default = User;
