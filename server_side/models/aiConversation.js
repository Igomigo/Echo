// Stores conversation context with the AI
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AiConversationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "Aimessages"
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model("Aiconversation", AiConversationSchema);