"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_koa_1 = require("apollo-server-koa");
const typeDefs = apollo_server_koa_1.gql `

  type Query {
    test: String
    user(id: ID!): User!
    foo: String!
  }


  type Mutation {
    createUser(
    firstName:String!, 
    lastName:String!, 
    email:String!,
    password:String!, 
    gpa:Float!, # Float or Int
    age:Int
    ethnicity:String!,
    educationLevel:String!
    ): AuthResponse!

    loginUser(
    email: String!, 
    password: String!
    ): User!
  }

  # Auth Section
  type Error {
    field:String!
    message:String!
  }

  type AuthResponse {
    error: [Error!]
    user: User
  }
 
  # End Auth Section



  # Lookup custom scalar types
  type User {
    id: String!
    firstName: String!
    lastName: String!
    password: String!
    gpa: Int!
    ethnicity: String!
    educationLevel: String!
    email: String!
    # scholarships: [Scholarship!]!
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
`;
exports.default = typeDefs;
