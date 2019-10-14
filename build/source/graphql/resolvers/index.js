"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = __importDefault(require("../../models/User.model"));
exports.Query = {
    test: () => `The test worked, Graphql is setup properly. NOW GET TO WORK`
};
exports.Mutation = {
    //This is wrong fix later
    createUser: async (parent, args, context) => {
        try {
            const user = new User_model_1.default(args);
            context.session.userId = user._id;
            await user.save();
            console.log(context.session.userId);
            return {
                user
            };
        }
        catch (error) {
            return {
                error
            };
        }
    },
    loginUser: async (parent, args, context) => ({})
};
