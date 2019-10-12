//Config
import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, ".env") });

//Graphql Setup
import schema from "./graphql/index";
const { ApolloServer } = require("apollo-server-koa");

//Koa
import Koa, { Context as KoaContext } from "koa";
import session from "koa-session";

import "./db";
import { Context } from "./types";

const app = new Koa();

app.keys = ["foo"];

const sesConfig = {
  key: "SCHOLARSESID",
  maxAge: 7.884e9
};
app.use(session(sesConfig, app));

const server = new ApolloServer({
  schema,
  context: ({ ctx }: { ctx: KoaContext }): Context => ctx
});

server.applyMiddleware({ app });

app.listen(4000);
console.log("Server listening on port 4000");
