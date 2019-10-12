import { readFileSync } from "fs";
import { resolve } from "path";

import { makeExecutableSchema } from "graphql-tools";
import * as resolvers from "../graphql/resolvers";

const schema = makeExecutableSchema({
  typeDefs: [readFileSync(resolve(__dirname, "schema.graphql"), "utf-8")],
  resolvers
});

export default schema;
