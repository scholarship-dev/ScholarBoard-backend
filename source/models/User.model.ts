import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import { IUserDocument } from "../interfaces/index";
const uniqueValidator = require("mongoose-unique-validator");

// Add validation
const UserSchema = new Schema({
  firstName: { type: String, required: true, trim: true, minlength: 1 },
  lastName: { type: String, required: true, trim: true, minlength: 1 },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: val => {
      if (!validator.isEmail(val)) {
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

UserSchema.pre<IUserDocument>("save", async function hash(next) {
  const user = this;
  const { password } = user;
  const hashedPassword = await bcrypt.hash(password, 7);
  user.password = hashedPassword;
  next();
});

UserSchema.statics.findLoginInfo = async function({ email, password }) {
  const user = await User.findOne({ email });

  if (!user) {
    return { message: "Your information is not correct" };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

const User = model<IUserDocument>("User", UserSchema);
UserSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

export default User;
