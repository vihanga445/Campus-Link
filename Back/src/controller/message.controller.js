import Conversation from "../model/conversation.js";
import Message from "../model/message.js";
import { errorHandler } from '../../utils/error.js';


export const initiateConversation = async (req , res , next)=>{
    try{
        const {receiverId, postId} = req.body;
        const senderId = req.user.id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
            postId
        });

        if(!conversation){
            conversation = new Conversation({
                participants: [senderId, receiverId],
                postId
            });
            await conversation.save();
        }
        res.status(200).json(conversation);
    }catch(error){
        next(error);
    }
};


export const sendMessage = async (req,res,next)=>{
    try{
        const {conversationId , content} = req.body;
        const senderId = req.user.id;
        const conversation = await Conversation.findById(conversationId);

        if(!conversation){
            return next(errorHandler(404,'Conversation not found'));
        }
        const newMessage = new Message({
            conversationId,
            senderId,
            content
        });
        await newMessage.save();
        conversation.lastMessage = {
            content,
            senderId,
            timestamp: new Date()
        };
        await conversation.save();
        res.status(200).json(newMessage);
    }catch(error){
        next(error);
    }
}

export const getConversations = async (req,res,next)=>{


    try {
        const userId = req.user.id;

        const conversations = await Conversation.find({
            participants: userId
        })
        .populate('participants', 'username profilePicture') // Replaces participants (array of user IDs) with actual user details (only username & profilePicture).
        .populate('postId', 'title') // Replaces postId (ID of the post) with actual post details (only title).
        .sort('-updatedAt');

        res.status(200).json(conversations);
    } catch (error) {
        next(error);
    }

};


export const getMessages = async (req, res, next) => {
    try {
        const { conversationId } = req.params;

        const messages = await Message.find({ conversationId })
            .populate('senderId', 'username profilePicture')
            .sort('createdAt');

        res.status(200).json(messages);
    } catch (error) {
        next(error);
    }
};