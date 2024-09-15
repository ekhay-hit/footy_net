const mongoose = require("mongoose");
// connect to datbase
mongoose.connect(
  process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/footyNet`
);

module.exports = mongoose.connection;
