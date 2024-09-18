const { Schema, model } = require("mongoose");

const fieldsSchema = new Schema({
    location: {
        type: String,
        required: true,
        unique: true,
    },
    created_at: {
        type: Date,
        required: true,
    },
    games:[ 
    {
        type: Schema.Types.ObjectId,
        ref: 'Game',
    }
]
});

const Fields = model("Fields", fieldsSchema);

module.exports = Fields;