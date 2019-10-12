"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const schema_1 = __importDefault(require("../graphql/schemas/schema"));
const resolvers_1 = __importDefault(require("../graphql/resolvers"));
const schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: schema_1.default,
    resolvers: resolvers_1.default
});
exports.default = schema;
