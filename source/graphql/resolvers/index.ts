import User from "../../models/User.model";
import Scholarship from "../../models/Scholarship.model";
import {
  QueryResolvers,
  MutationResolvers,
  AuthResponse
} from "../../generated/graphql";

export const Query: QueryResolvers = {
  test: () => `The test worked, Graphql is setup properly. NOW GET TO WORK`
};

export const Mutation: MutationResolvers = {
  createUser: async (parent, args, context): Promise<AuthResponse> => {
    //Sign up a user
    const user = new User(args);
    console.log(user);

    return user;
  }
  // loginUser: (parent, args, context) => ({
  //   //Check the users password
  //   //
  // })
};
