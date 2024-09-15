const { Schema, model } = require("mongoose");
const bcryp = require("bcrypt");

// Uses collection Schema
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
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: "Game",
    },
  ],
});

// Before create new user run pre to encrypt the password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcryp.hash(this.password, saltRounds);
  }
  next();
});

// before the user login verify that the password matches what is in database for the usre
userSchema.method.isCorrectPassword = async function (password) {
  return bcryp.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
