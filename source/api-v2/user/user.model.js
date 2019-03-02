//
// ─── USER MODEL AND METHODS ─────────────────────────────────────────────────────
//

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// The Schema defined with needed properties to be stored in Mongo
const UserSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  firstname: { type: String, required: false, trim: true},
  lastname: { type: String, required: false, trim: true},
  email: {
    type: String, 
    required: true, 
    trim: true, 
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  password: { type: String, select: true, trim: true},
  gpa: { type: Number, required: true, trim: true},
  ethnicity: { type: String, required: true, trim: true},
  educationLevel: { type: String, required: true, trim: true},
  grade: { type: String, required: true, trim: true}
});

// Class Method to save a user object
UserSchema.pre('save', function(next) {
  // keeps track of the date account is created and updated
  const now = new Date()
  this.updatedAt = now
  if (!this.createdAt) {
    this.createdAt = now
  }

  // Encrypt and Salt the User's Password
  const user = this
  if (!user.isModified('password')) {
    return next()
  }

  // Generates a salted and hashed password for the user
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash
      next()
    })
  })
})

// Checks if the re-entered password matches the former
UserSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
