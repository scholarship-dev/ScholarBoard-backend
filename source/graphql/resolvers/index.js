const User = require("../../models/User.model");
const Scholarship = require("../../models/Scholarship.model");

const resolvers = {
  Query: {
    test: () => `The test worked, Graphql is setup properly. NOW GET TO WORK`,
    user: (root, args, context, info) => {}
  },
  Mutation: {
    createUser: () => ({
      id: "1",
      firstName: "William"
    })
  }
};

module.exports = resolvers;
