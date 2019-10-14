"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const graphql_tools_1 = require("graphql-tools");
const resolvers = __importStar(require("../graphql/resolvers"));
const schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: [fs_1.readFileSync(path_1.resolve(__dirname, "schema.graphql"), "utf-8")],
    resolvers
});
exports.default = schema;
