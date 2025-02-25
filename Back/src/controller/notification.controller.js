import Notification from "../model/notification.model.js";
import { errorHandler } from "../../utils/error.js";





export const createNotification = async (recipientId, type , message, postId=null)=>{
    try{
        const notification = new Notification({
            recipient: recipientId,
            type,
            message,
            postId
        });
        await notification.save();
        return notification;
     }
     catch(error){
        throw error;
     }
    
}

export const getUserNotifications = async (req,res,next)=>{
    try{
        const notifications = await Notification.find({recipient: req.user.id}).sort({createdAt:-1}).populate('postId','title');
        res.status(200).json(notifications);
    }
    catch(error){
        next(error);
    }
}


export const markAsRead = async(req,res,next)=>{
    try{
        const notification = await Notification.findById(
            req.params.id,
            {read:true},
            {new:true}
         );
         res.status(200).json(notification);
    }
    catch(error){
        next(error);
    }
};