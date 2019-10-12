"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = __importDefault(require("../../models/User.model"));
const resolvers = {
    Query: {
        test: () => `The test worked, Graphql is setup properly. NOW GET TO WORK`,
        foo: (parent, args, ctx, info) => {
            const { count } = ctx.session;
            ctx.session.count = (count || 0) + 1;
            return String(ctx.session.count);
        }
    },
    Mutation: {
        createUser: async (parent, args, context) => {
            //Sign up a user
            console.log;
            const user = new User_model_1.default(args);
            await user.save();
            //Do the validation check that they are not a user already
            //Store the cookie on the context
        },
        loginUser: (parent, args, context) => ({
        //Check the users password
        //
        })
    }
};
exports.default = resolvers;
