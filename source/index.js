const Koa = require("koa");
const session = require("koa-session");
const { ApolloServer } = require("apollo-server-koa");
const { typeDefs, resolvers } = require("./graphql/schemas/index");
const app = new Koa();

app.keys = ["secret?"];

const sessConfig = {
  key: "TEST",
  maxAge: 7.884e9
};

app.use(session(sessConfig, app));

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
