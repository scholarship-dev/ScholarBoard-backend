import { connect } from "mongoose";

function connectToDB() {
  const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds233268.mlab.com:33268/scholarboard`;
  
  try {
    connect(
      uri,
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
