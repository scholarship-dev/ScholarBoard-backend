const express = require("express");
const { buildSchema } = require("graphql");
const graphqlHTTP = require("express-graphql");
const app = express();

const schema = buildSchema(`
type Query {
    hello:String
}
`);

const root = {
  hello: () => {
    return "Hello World";
  }
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Your server is listening on ${PORT}`);
});
