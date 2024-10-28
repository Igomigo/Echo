// Contains code that returns the AI conversation for the user
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const aiConversation = require("../models/aiConversation");
const aiConversation = require("../models/aiConversation");
const aiMessage = require("../models/aiMessage");

const getAiConversation = async (req, res) => {
    try {
        const current_user = getUserDetailsFromToken();

        const aiConversation = await aiConversation.findOne(
            { userId: current_user._id }
        ).populate("messages").sort({ updatedAt: -1 });

        if (!aiConversation) {
            return res.status(404).json({
                status: "success",
                message: "Conversation data not found"
            });
        }

        const messages = aiConversation.messages;

        return res.status(200).json({
            status: "success",
            message: "Ai conversation messages retrieved",
            data: messages
        });

    } catch (err) {
        console.error("An error occurrrd while retrieving all AI conversation:", err.message);
        return res.status(500).json({
            error: true,
            message: "Error retrieving AI messages"
        });
    }
}

module.exports = getAiConversation;