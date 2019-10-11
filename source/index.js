const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Now listening on port 4000`);
});
