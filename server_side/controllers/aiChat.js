// This file contains code that integrates the openai chat functionality
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const aiConversation = require("../models/aiConversation");
const aiMessage = require("../models/aiMessage");

// Import openai
const OpenAI = require("openai");

// Configure openai with the secret key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_SECRET_KEY
});

// Create the chatbot functionality
const chatWithEcho = async (req, res) => {
    try {
        const token = req.cookies.token || "";
        const current_user = await getUserDetailsFromToken(token);

        const { messages } = req.body;

        // Validate the message field to be sure that it is not empty
        if (!messages || messages.length === 0) {
            return res.status(400).json({
                error: true,
                message: "Message field is empty"
            });
        }

        // Extract the user message and create the message document
        const userMessage = messages[messages.length - 1];

        const newMessage = new aiMessage({
            userId: current_user._id,
            role: "user",
            content: userMessage.content
        });
        await newMessage.save();

        // Update the conversations data
        let conversation = await aiConversation.findOne({
            userId: current_user._id
        });

        if (!conversation) {
            conversation = new aiConversation({
                userId: current_user._id,
                messages: newMessage._id
            });
        }

        // If conversation exists, update the messages array
        conversation.messages.push(newMessage._id);
        await conversation.save();

        // Send the message to the openai chat model
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages
        });

        // Handle the model's response
        const message = response.data.choices[0].message.content;

        // Create the assistant message document
        const assistantMessage = new aiMessage({
            userId: current_user._id,
            role: "assistant",
            content: message
        });
        await assistantMessage.save();

        // Update the conversation with the assistant message
        conversation.messages.push(assistantMessage._id);
        await conversation.save();

        // Return the assistant response back to the client
        return res.status(200).json({
            status: "success",
            message: "Successfully returned a response from chatgpt",
            content: message
        });

    } catch (err) {
        console.log("Error processing response:", err.message);

        // Check for OpenAI rate limit or quota errors
        if (err.status === 429 || err.code === 'insufficient_quota') {
            return res.status(429).json({
                error: true,
                message: "OpenAI API quota exceeded. Please try again later."
            });
        }

        return res.status(500).json({
            error: true,
            message: "Error processing a response"
        });
    }
}

module.exports = chatWithEcho;