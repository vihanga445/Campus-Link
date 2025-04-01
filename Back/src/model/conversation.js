import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    lastMessage: {
        content: String,
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        timestamp: Date
    }
},{timestamps: true});

const Conversation = mongoose.model('Conversation', conversationSchema);
export default Conversation;