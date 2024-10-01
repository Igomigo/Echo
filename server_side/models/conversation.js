const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    sender : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : 'User'
    },
    receiver : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : 'User'
    },
    messages : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'Message'
        }
    ]
},{
    timestamps : true
});

// Update the updated at field before a save action is triggered
conversationSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const ConversationModel = mongoose.model('Conversation',conversationSchema);

module.exports = ConversationModel;