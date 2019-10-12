import User from "../../models/User.model";
import { QueryResolvers, MutationResolvers } from "../../generated/graphql";

export const Query: QueryResolvers = {
  test: () => `The test worked, Graphql is setup properly. NOW GET TO WORK`
};

export const Mutation: MutationResolvers = {
  createUser: async (parent, args, context): Promise<{}> => {
    //Sign up a user
    const user = new User(args);
    console.log(user);
    await user.save();

    return {
      user
    };
  }
  // loginUser: (parent, args, context) => ({
  //   //Check the users password
  //   //
  // })
};
