const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
    fieldName: {
        type: String,
        required: true,
    },
    gameDate: {
       type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
   capacity: {
        type: String,
        required: true,
   },
   endTime: {
        type: String,
        required: true,
   },
   userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  player: [User],
  fieldId: {
    type: Schema.Types.ObjectId,
    ref: "Field",
  },
},
);

const Game = model("Game", gameSchema);

module.exports = Game;