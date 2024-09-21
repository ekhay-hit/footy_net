const { Query } = require("mongoose");
const User = require("../models/User");
const Field = require("../models/Fields");
const { signToken, AuthenticationError } = require("../utils/auth");
const resolvers = {
  Query: {
    // me query to get the user that is loggedIn **********************
    me: async (parent, _, { user }) => {
      // if there is no user logged in
      if (!user) {
        throw new Error("Not authenticated");
      }

      // if there is a user
      try {
        const loggedInUser = await User.findById(user._id);

        // if the user with the id not found
        if (!loggedInUser) {
          throw new Error("No user with the requisted Id found");
        }
        // if the loggedin user found return it otherwise catch
        return loggedInUser;
      } catch (err) {
        throw new Error("server erorr: failed to get the user");
      }
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
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    addField: async (_, { location, fieldName, image }) => {
      try {
        const field = await Field.create({ location, fieldName, image });
        if (!field) {
          throw new Error(`failed to create new field`);
        }
        return field;
      } catch (err) {
        throw new Error(`creating new field failed:${err.message}`);
      }
    },
  },
};

module.exports = resolvers;
