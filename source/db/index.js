const mongoose = require("mongoose");

function connectToDB() {
  try {
    mongoose.connect("mongodb://localhost:27017/Scholarboard", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`Connected to the DB`);
  } catch (e) {
    console.log(e);
  }
}

connectToDB();
