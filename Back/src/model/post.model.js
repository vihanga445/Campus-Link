import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,

    },
    content:{
        type:String,
        required: true,
    },
    title:{

        type:String,
        required: true,
    },
    image:{
        
        type:String,
        default:'https://th.bing.com/th/id/OIP.4fo2NmYyG5BniYnc1QMq7wHaHa?rs=1&pid=ImgDetMain',

    },
    category:{
        type:String,
        default:'Event',
        enum: ['Event', 'Lost-Found', 'Clubs and Societies', 'Announcements'],
        required: true,
    },
    eventDetails: {
        types: [{ 
            type: String,
            enum: ['Academic', 'Cultural', 'Sports', 'Workshop', 'Career', 'Club']
        }],
        date: {
          type: Date,
          required: function() { return this.category === 'Event'; }
        },
        time: String,
        eventMode: {
            type: String,
            enum: ['physical', 'online', 'hybrid'],
            default: 'physical',
            required: function() { return this.category === 'Event'; }
        },
        venue: {
          type: String,
          required: function() { 
              return this.category === 'Event' && 
                    (this.eventDetails.eventMode === 'physical' || 
                     this.eventDetails.eventMode === 'hybrid'); 
          }
        },
        onlineLink: {
            type: String,
            required: function() { 
                return this.category === 'Event' && 
                      (this.eventDetails.eventMode === 'online' || 
                       this.eventDetails.eventMode === 'hybrid');
            }
        },
        organizer: String,
        registration: {
          required: Boolean,
          deadline: Date,
          link: String
        },
        maxParticipants: Number,
        currentParticipants: {
          type: Number,
          default: 0
        },
        approvalDocument: {
            type: String,
            default: null
        }
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    status:{
        type:String,
        enum:['pending','approved','rejected'],
        default:'pending',
    },
    rejectionReason:{
        type:String,
        default:'',
    },
    moderationDetails: {
        moderatorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null
        },
        rejectionReason:{
            type: String,
            default: ''

        },
        moderatedAt: {
            type: Date,
            default: null
        }   
    }
},{timestamps: true});


const Post = mongoose.model('Post',postSchema);
export default Post;