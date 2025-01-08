import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    moderatorRole: {
        isModerator: {
            type: Boolean,
            default: false
        },
        category: {
            
            type: String,
            enum: ['Event', 'lost-found', 'memberships', null],
            default: null
        }
    }
},{timestamps: true});

userSchema.index({ 'moderatorRole.isModerator': 1, 'moderatorRole.category': 1 });

const User = mongoose.model("User",userSchema);

export default User;
