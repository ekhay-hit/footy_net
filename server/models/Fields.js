const { Schema, model, default: mongoose } = require("mongoose");

const fieldsSchema = new Schema({
  location: {
    type: String,
    required: true,
  },
  fieldName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  //     games:[
  //     {
  //         type: Schema.Types.ObjectId,
  //         ref: 'Game',
  //     }
  // ]
});

const Fields = model("Fields", fieldsSchema);

module.exports = Fields;
