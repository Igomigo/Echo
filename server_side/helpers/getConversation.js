const Conversation = require("../models/conversation");

const getConversation = async (currentUserId) => {
    if (currentUserId) {
        // Get all conversations for a particular user
        const currentUserConversations = await Conversation.find({
            $or: [
                { sender: currentUserId },
                { receiver: currentUserId }
            ]
        }).sort({ updatedAt: -1 }).populate("messages").populate("sender").populate("receiver");

        const conversation = currentUserConversations.map((conv) => {
            const countUnseenMsg = conv?.messages.reduce((prev, curr) => {

                const msgByUserId = curr?.msgByUserId?.toString();
                
                if (msgByUserId !== currentUserId) {
                    return prev + (curr.seen ? 0 : 1);
                } else {
                    return prev;
                }

            }, 0);

            const payload = {
                id: conv?._id,
                sender: conv?.sender,
                receiver: conv?.receiver,
                unSeenMsg: countUnseenMsg,
                lastMsg: conv?.messages[conv?.messages?.length - 1]
            }

            return payload;
        });

        return conversation;
    } else {
        return [];
    }
}

module.exports = getConversation;