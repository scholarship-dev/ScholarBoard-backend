let user = {
  id: "12",
  firstName: "William",
  lastName: "Bogans",
  password: "test1234",
  gpa: "2.8",
  ethnicity: "Black",
  educationLevel: "Highschool",
  grade: "11",
  appliedFor: []
};

const resolvers = {
  Query: {
    test: () => `The test worked, Graphql is setup properly. NOW GET TO WORK`,
    user: (root, args, context, info) => user
  }
};

module.exports = resolvers;
