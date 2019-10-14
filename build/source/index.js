"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Config
const dotenv_1 = require("dotenv");
const path_1 = require("path");
dotenv_1.config({ path: path_1.resolve(__dirname, ".env") });
//Graphql Setup
const index_1 = __importDefault(require("./graphql/index"));
const { ApolloServer } = require("apollo-server-koa");
//Koa
const koa_1 = __importDefault(require("koa"));
const koa_session_1 = __importDefault(require("koa-session"));
require("./db");
const app = new koa_1.default();
app.keys = ["foo"];
const sesConfig = {
    key: "SCHOLARSESID",
    maxAge: 7.884e9
};
app.use(koa_session_1.default(sesConfig, app));
const server = new ApolloServer({
    schema: index_1.default,
    context: ({ ctx }) => ctx
});
server.applyMiddleware({ app });
app.listen(4000);
console.log("Server listening on port 4000");
