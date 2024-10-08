require("dotenv").config();

// requiring express to create server
const express = require("express");
const path = require("path");
// connection to db config
const db = require("./config/connection");
const { authMiddleware } = require("./utils/auth");
// graphql and appollo import
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
// sechemas requires
const { typeDefs, resolvers } = require("./schemas");

const { User } = require("./models/User");

// Port
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});
// new instance of an Apollo server with the graphql schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ limit: "10mb", extended: false }));
  app.use(express.json({ limit: "10mb" }));

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html "));
    });
  }
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQl at http://localhost:${PORT}/graphql`);
    });
  });
};

// calling the server funciton to run the server
startApolloServer();
