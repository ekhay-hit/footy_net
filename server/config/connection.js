const mongoose = require("mongoose");
require("dotenv").config();
// connect to datbase
const dbURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/footynet";
mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDb connected successfully"))
  .catch((error) => console.log("MongoDb connection error", error));

module.exports = mongoose.connection;
