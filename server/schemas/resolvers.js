const User = require("../models/User");
const Field = require("../models/Fields");
const { signToken, AuthenticationError } = require("../utils/auth");
const dateScalar = require("../utils/dateScalar");

const resolvers = {
  Date: dateScalar,
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
    // find field by user id

    fieldsByUser: async (parent, _, { user }) => {
      if (!user) {
        throw new Error("not authenticated");
      }
      try {
        const fields = await Field.find({ userId: user._id });
        return fields;
      } catch (err) {
        throw new Error("Server Error: Failed to fetch fields");
      }
    },
  },
  Mutation: {
    // create user Mutation *****************************************************************
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
    // login Mutation *****************************************************************
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

  // AP mutation: Add a game mutation
    game: async (_, { fieldName, gameDate, startTime, capacity, endTime }, {owner}) => {
      if (!owner) {
        throw new Error ("Not An Owner");
      }

      try {
        const game = await Game.create({
          fieldName,
          gameDate,
          startTime,
          capacity,
          endTime,
          ownerId: owner._id,
        });
        if (!game) {
          throw new Error (`Failed to created new game.`);
        }
        return game;
      } catch (err) {
        throw new Error (`Creating new game failed:${err.message}`);
      }
    },
    // add a field mutation **************************************************
    addField: async (_, { location, fieldName, image }, { user }) => {
      if (!user) {
        throw new Error("Not authenticated");
      }

      try {
        const field = await Field.create({
          location,
          fieldName,
          image,
          userId: user._id,
        });
        if (!field) {
          throw new Error(`failed to create new field`);
        }
        return field;
      } catch (err) {
        throw new Error(`creating new field failed:${err.message}`);
      }
    },

    // Remove Field Mutation ******************************************************
    async removeField(_, { fieldId }) {
      try {
        const delteField = await Field.findByIdAndDelete(fieldId);

        // if no field found retun the mutationresponse with flase and message
        if (!delteField) {
          return {
            success: false,
            message: "Field not found",
          };
        }

        // if succed return Mutationresponse with true and message
        return {
          success: true,
          message: "Field deleted successfully ",
        };

        // else return mutationresponse with false and server issue
      } catch (err) {
        console.error("Error removing field", err);
        return {
          success: false,
          message: "Failed to remove the field: server",
        };
      }
    },

    updateUser: async (_, { avatar }, { user }) => {
      if (!user) {
        throw new Error("You are not authenticated");
      }

      try {
        const updateUser = await User.findByIdAndUpdate(
          user._id,
          { avatar: avatar },
          { new: true }
        );
        if (!updateUser) {
          throw new Error("Failed to update user");
        }
        return updateUser;
      } catch (error) {
        console.error("failed to update user");
      }
    },
  },
};


module.exports = resolvers;