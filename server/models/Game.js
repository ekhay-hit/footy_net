const User = require("./User");
const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
  gameDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  isRecurring: {
    type: Boolean,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  players: [{ type: Schema.Types.ObjectId, ref: "User" }],

  field: {
    type: Schema.Types.ObjectId,
    ref: "Fields",
  },
});

const Game = model("Game", gameSchema);

module.exports = Game;
