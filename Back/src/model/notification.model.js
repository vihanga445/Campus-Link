import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({

    recipient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['POST_APPROVED', 'POST_REJECTED', 'COMMENT', 'REPLY', 'FOLLOW']
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    message:{
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }

},{timestamps: true});

export default mongoose.model('Notification',notificationSchema);