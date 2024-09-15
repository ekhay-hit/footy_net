const { Query } = require("mongoose");
const { User } = require("../models/User");
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
    createUser: (parent, { username, email, password }) => {
      return { id: "1, username, email" };
    },
  },
};

module.exports = resolvers;
