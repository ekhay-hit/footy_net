const mongoose = require("mongoose");
// connect to datbase
const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb connected successfully"))
  .catch((error) => console.log("MongoDb connection error", error));

module.exports = mongoose.connection;
