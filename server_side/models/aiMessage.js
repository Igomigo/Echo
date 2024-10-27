// Stores each message chat with the AI
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AiMessageSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: String,
        enum: ["system", "user", "assistant"],
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Aimessages", AiMessageSchema);