const { Schema, model, default: mongoose } = require("mongoose");

const fieldsSchema = new Schema({
  location: {
    type: String,
    required: true,
  },
  fieldName: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Fields = model("Fields", fieldsSchema);

module.exports = Fields;
