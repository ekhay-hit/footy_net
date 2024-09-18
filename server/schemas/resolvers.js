const { Query } = require("mongoose");
const User = require("../models/User");
const { signToken, AuthenticationError } = require("../utils/auth");
const resolvers = {
  Query: {
    getUser: () => {
      return {
        id: "1",
        username: "nameoftheuser",
        email: "anEmail@example.com",
      };
    },
  },

  Mutation: {
    createUser: async (_, { username, email, password }) => {
      // try create user
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        // if success return token and user
        return { token, user };
        // return user;
      } catch (err) {
        throw new Error(`creating new user failed:${err.message}`);
      }
    },
    login: async (_, {email, password}) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user};
    }
  },
};

module.exports = resolvers;
