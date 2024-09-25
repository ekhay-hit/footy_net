const User = require("../models/User");
const Fields = require("../models/Fields");
const Game = require("../models/Game");
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
        const fields = await Fields.find({ userId: user._id });
        return fields;
      } catch (err) {
        throw new Error("Server Error: Failed to fetch fields");
      }
    },

    // Get Games that are owned by a specific user or owner
    gamesByUser: async (parent, _, { user }) => {
      // if no user return not authenticated
      if (!user) {
        throw new Error("not authenticated");
      }
      try {
        // look for the games and return those taht owned by the user

        // current date, so only games that past due can be here
        const currentDate = Date.now();
        const games = await Game.find({
          userId: user._id,
          gameDate: { $gte: currentDate },
        })
          .populate("field")
          .sort({ gameDate: 1 });
        return games;
      } catch (err) {
        throw new Error("Server Error: Failed to fetch games");
      }
    },

    // get Game by a given date ************************************

    gameByDate: async (_, { gameDate }) => {
      // if game date not provided
      if (!gameDate) {
        throw new Error("In valid date");
      }

      try {
        // get all games taht are schedule on the given date
        const games = await Game.find({
          gameDate: gameDate,
        }).populate({ path: "field" }); // populate the field using field refe in game collection

        return games;
      } catch (err) {
        throw new Error("Server: Faild to retrieve the game");
      }
    },
  },

  //************************All Mutation here  ***************************************/

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
        throw new Error("Could not authenticate user");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error("Coult not authenticate user");
      }

      const token = signToken(user);
      return { token, user };
    },

    //  mutation: Add a game mutation********************
    createGame: async (
      _,
      { fieldName, gameDate, startTime, capacity, price, endTime, isRecurring },
      { user }
    ) => {
      // if no user authenticated return error
      if (!user) {
        throw new Error("Not authenticated");
      }

      try {
        // search for the field using its name and get the id of the field
        // before create the game find the field where the game will be played based on the field name selected

        const field = await Fields.findOne({ fieldName });
        if (!field) {
          throw new Error("Field with name provided not found");
        }

        // when you find the field using the name destucture the id from the field
        const { _id: fieldId, location, image } = field;

        // after having field id created the game
        const game = await Game.create({
          gameDate,
          startTime,
          capacity,
          price,
          endTime,
          userId: user._id,
          isRecurring,
          field: fieldId,
        });

        if (!game) {
          throw new Error(`Failed to created new game.`);
        }

        // If game is recurring, create additional entries for the next 30 days
        if (isRecurring) {
          const date = new Date(gameDate);
          for (let i = 1; i <= 30; i++) {
            const nextDate = new Date(date);
            nextDate.setDate(date.getDate() + i);
            await Game.create({
              capacity,
              price,
              startTime,
              endTime,
              gameDate: nextDate.toISOString(),
              isRecurring: true,
              field: fieldId,
              userId: user._id,
            });
          }
        }
        return game;
      } catch (err) {
        throw new Error(`Creating new game failed:${err.message}`);
      }
    },

    // add a field mutation **************************************************
    addField: async (_, { location, fieldName, image }, { user }) => {
      if (!user) {
        throw new Error("Not authenticated");
      }

      try {
        const field = await Fields.create({
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
        const delteField = await Fields.findByIdAndDelete(fieldId);

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
    // muatation to delete a game *****************************

    async removeGame(_, { gameId }) {
      try {
        const deleteGame = await Game.findByIdAndDelete(gameId);
        // if no field found retun the mutationresponse with
        // flase and message
        if (!deleteGame) {
          return {
            success: false,
            message: "Game not found",
          };
        }
        // if succed return Mutationresponse with true and message
        return {
          success: true,
          message: "Game deleted successfully ",
        };
        // else return mutationresponse with false and server issue
      } catch (err) {
        console.error("Error removing game", err);
        return {
          success: false,
          message: "Failed to remove the game: server",
        };
      }
    },
    /// mutation to udpate user **************************
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
