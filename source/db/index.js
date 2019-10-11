const mongoose = require("mongoose");

function connectToDB() {
  console.log(process.env.DB_USER);
  try {
    mongoose.connect(
      `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds233268.mlab.com:33268/scholarboard`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log(`Connected to the DB`);
  } catch (e) {
    console.log(e);
  }
}

connectToDB();
