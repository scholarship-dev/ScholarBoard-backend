const koa = require("koa");
const koaRouter = require("koa-router");
const koaBody = require("koa-body");
const { graphqlKoa } = require("apollo-server-koa");
const typeDefs = require("./graphql/schemas/index");

const app = new koa();
const router = new koaRouter();

app.use(koaBody());

router.post("/graphql", graphqlKoa({ schema: typeDefs }));
router.get("/graphql", graphqlKoa({ schema: typeDefs }));

const PORT = process.env.PORT || 4001;

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
