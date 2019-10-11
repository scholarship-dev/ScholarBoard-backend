const { gql } = require("apollo-server");
const { makeExecutableSchema } = require("graphql-tools");

const typeDefs = gql`
  # Root types

  # TODO: Figure out the main scholarship query
  type Query {
    #Types of queries allowed on our API
    test: String
    user(id: ID!): User!
  }

  type Mutation {
    # TODO: Mutations allowed on our API
    createUser(name: String!, email: String!, password: String): AuthResponse!
    loginUser(email: String!, password: String!): AuthResponse!
  }

  type Subscription {
    # TODO: Add subscriptions
    newUser: User!
  }

  type AuthResponse {
    SESID: String!
    user: User!
  }

  # Lookup custom scalar types
  type Scholarship {
    id: ID!
    name: String
    funding: Int
    contactInfo: Int
    description: String
    ethnicity: String
    educationLevel: String
    grade: String
    gpa: String
  }

  # Lookup custom scalar types
  type User {
    id: String!
    firstName: String!
    lastName: String!
    password: String!
    gpa: String!
    ethnicity: String!
    educationLevel: String!
    email: String!
    appliedFor: [Scholarship!]!
  }
`;

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

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = schema;

/*
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    gpa: { type: GraphQLString },
    ethnicity: { type: GraphQLString },
    educationLevel: { type: GraphQLString },
    grade: { type: GraphQLString }
  })
});

module.exports = typeDefs;

const ScholarshipType = new GraphQLObjectType({
  name: "Scholarship",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    funding: { type: GraphQLInt },
    contactInfo: { type: GraphQLString },
    description: { type: GraphQLString },
    ethnicity: { type: GraphQLString }, //Enum?
    educationLevel: { type: GraphQLString }, //Enum?
    grade: { type: GraphQLString }, //Enum?
    gpa: { type: GraphQLInt } // Enum??
  })
});

/*
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    scholarship: {
      type: ScholarshipType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // Get data from db/ other source
        return _.find(scholarships, { id: args.id });
      }
    }
  }
});

const rootQuery = new GraphQLSchema({
  query: RootQuery
});
*/
