require("dotenv").config({ path: __dirname + "/.env" });
require("./db");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./graphql/index");

const app = express();

app.use("/graphql", graphqlHTTP({ schema }));

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log(`Server listening for request on port ${PORT}`);
});
