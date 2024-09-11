const { Schema, model } = require("mongoose");
const bcryp = require("bcrypt");

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  //   games:[
  // {
  // type:Schema.Types.ObjectId,
  // ref:"Game",
  //   }
  // ]
});
