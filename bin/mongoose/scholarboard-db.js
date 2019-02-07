/* Mongoose Connection */
const mongoose = require('mongoose');
assert = require('assert');

/* Checking or mongoose connection */
const db = mongoose.connection;
db.on('connected', () => {
  console.log('Success: connected to MongoDB');
})

const url = process.env.MONGODB_URI;
mongoose.Promise = global.Promise;
mongoose.connect(
  url,
  { useNewUrlParser: true }
);

mongoose.set('set', true);

db.on('error', console.error.bind(console, 'MongoDB connection Error:'));
mongoose.set('debug', true);

module.exports = mongoose.connection;