const mongoose = require('mongoose');
      assert = require('assert');

const url = process.env.MONGODB_URI || 'mongodb://localhost/ScholarBoardData1234';
mongoose.Promise = global.Promise;
mongoose.connect(
  url,
  { useNewUrlParser: true },
  function(err, db) {
    assert.equal(null, err);
    // db.close(); turn on for testing
    console.log(err);
  }
);

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));
mongoose.set('debug', true);

module.exports = mongoose.connection;
