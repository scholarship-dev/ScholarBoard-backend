import User from "../../models/User.model";
import { QueryResolvers, MutationResolvers } from "../../generated/graphql";
import { log } from "console";

export const Query: QueryResolvers = {
  test: () => `The test worked, Graphql is setup properly. NOW GET TO WORK`
};

export const Mutation: MutationResolvers = {
  //This is wrong fix later
  createUser: async (parent, args, context): Promise<{}> => {
    try {
      const user = new User(args);

      context.session.userId = user._id;

      await user.save();

      return {
        user
      };
    } catch (error) {
      return {
        error
      };
    }
  },
  // TODO: Figure this out in the morning
  loginUser: async (parent, args, context): Promise<{}> => ({})
};
