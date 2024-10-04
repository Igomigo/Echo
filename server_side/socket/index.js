// Set up socket.io connection to infuse realtime functionalities to the app
const express = require("express");
const { Server } = require("socket.io");
const User = require("../models/user");
const http = require("http");
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const Conversation = require("../models/conversation");
const Message = require("../models/message");

const app = express();

/** Socket connection */
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
});

// Online user array
const onlineUser = new Set();

io.on("connection", async (socket) => {
    console.log("User connected", socket.id);

    const token = socket.handshake.auth.token;
    let user;

    try {
        // Validate token and get user details
        user = await getUserDetailsFromToken(token);

        if (!user) {
            throw new Error("Invalid token, user not found");
        }

        // Join user to a room
        socket.join(user._id.toString());
        onlineUser.add(user._id.toString());

        io.emit("onlineUser", Array.from(onlineUser));
    } catch (error) {
        console.error("Token validation error:", error.message);

        // Emit error message to the client or disconnect the socket
        socket.emit("error", "Invalid or expired token. Please reauthenticate.");
        return socket.disconnect(); // Disconnect the user with an invalid token
    }

    // Handle other socket events like "message-page"
    socket.on("message-page", async (userId) => {
        // Fetch user details and emit the user payload
        const userDetails = await User.findById(userId).select("-password");
        const payload = {
            _id: userDetails?._id,
            name: userDetails?.name,
            email: userDetails?.email,
            profile_pic: userDetails?.profile_pic,
            online: onlineUser.has(userId)
        };
        socket.emit("message-user", payload);
    });

    // Handle new message
    socket.on("new message", async (data) => {
        // Check if conversation exists
        let conversation = await Conversation.findOne({
            $or: [
                { sender: data?.sender, receiver: data?.receiver },
                { sender: data?.receiver, receiver: data?.sender }
            ]
        });

        if (!conversation) {
            const newConversation = new Conversation({
                sender: data?.sender,
                receiver: data?.receiver
            });

            conversation = await newConversation.save();
        }

        // Create a new message
        const message = new Message({
            text: data?.text,
            imageUrl: data?.imageUrl,
            videoUrl: data?.videoUrl,
            msgByUserId: data?.sender
        });
        const savedMessage = await message.save();

        // Add message Id top the conversation model and save
        conversation.messages.push(savedMessage._id);
        await conversation.save();

        // Emit the conversation data back to the client
        const getConversationMessages = await Conversation.findOne({
            $or: [
                { sender: data?.sender, receiver: data?.receiver },
                { sender: data?.receiver, receiver: data?.sender }
            ]
        }).populate("messages").sort({updatedAt: -1});

        io.to(data?.sender).emit("message", getConversationMessages.messages);
        io.to(data?.receiver).emit("message", getConversationMessages.messages);
    });

    // Disconnect event
    socket.on("disconnect", () => {
        onlineUser.delete(user._id);
        console.log("User disconnected", socket.id);
    });
});


module.exports = {
    app,
    server
}
