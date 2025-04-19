import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({

    title:{
        type: String,
        required:true,
    },
    message:{
        type: String,
        required:true,
    },
    category:{
        type: String,
        required:true,
        enum: ["General","Academic","Administrative"]

    },
    attachments:[
        {
            filename: {
                type: String,
                
            },
            fileUrl: {
                type: String,
                
            },
        },
    ],
    priority:{
        type: String,
        enum : ["Normal","Important","Urgent"],
        default: "Normal",

    },
    pinned:{
        type: Boolean,
        default: false,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    seenBy:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
},{timestamps : true});

announcementSchema.index({ createdAt: -1});

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;