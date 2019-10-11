const { makeExecutableSchema } = require("graphql-tools");
const typeDefs = require("../graphql/schemas/schema.graphql");
const resolvers = require("../graphql/resolvers/index");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = schema;
