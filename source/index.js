const koa = require("koa");
const koaRouter = require("koa-router");
const koaBody = require("koa-body");
const { graphqlKoa } = require("apollo-server-koa");
const typeDefs = require("./graphql/schemas/index");

const app = new Koa();
const router = new koaRouter();

app.use(koaBody());

router.get("/graphql", graphqlKoa({ schema: typeDefs }));
router.get("/graphql", graphqlKoa({ schema: typeDefs }));

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
