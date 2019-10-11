const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    scholarships: [Scholarship]!
    scholarship(id: ID!): Scholarship
    me: User
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
    id: ID!
    firstName: String
    lastName: String
    password: String
    gpa: String
    ethnicity: String
    educationLevel: String
    grade: String
    email: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => `Hello World!`
  }
};

module.exports = { resolvers, typeDefs };

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

/*Is this the same?
const ScholarshipSchema = new Grap({
  name: { type: String, required: true },
  deadline: { type: Date, required: false },
  funding: { type: String, required: false },
  contactInfo: { type: String, required: false },
  description: { type: String, required: false },
  ethnicity: { type: String, required: false },
  educationLevel: [{ type: String, required: false }],
  grade: { type: String, required: false },
  gpa: { type: String, required: false }
});
*/

/*
const UserSchema = new Schema({
  firstname: { type: String, required: false, trim: true },
  lastname: { type: String, required: false, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  password: { type: String, select: true, trim: true },
  gpa: { type: Number, required: true, trim: true },
  ethnicity: { type: String, required: true, trim: true },
  educationLevel: { type: String, required: true, trim: true },
  grade: { type: String, required: true, trim: true }
});
*/
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
