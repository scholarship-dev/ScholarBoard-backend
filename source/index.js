const Koa = require("koa");
const session = require("koa-session");
const { ApolloServer } = require("apollo-server-koa");
const schema = require("./graphql/index");
const app = new Koa();
require("./db");

//Add redis store https://github.com/koajs/koa-redis
const sessConfig = {
  key: "SCHOOL",
  maxAge: 7.884e9
};

app.use(session(sessConfig, app));

const server = new ApolloServer({ schema });

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
