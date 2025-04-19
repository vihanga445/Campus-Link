import { errorHandler } from "../../utils/error.js";
import Comment from "../model/comment.model.js";
import Post from "../model/post.model.js"; // Assuming Post model exists

export const createComment = async (req,res,next) =>{
    try{
        const {content,postId,userId} = req.body;
        if(userId !== req.user.id){

            return next(errorHandler(403,'You are not authorized to create a comment'));
        }
        const newComment = new Comment({
            content,
            postId,
            userId,
        });
        await newComment.save();
        res.status(200).json(newComment);
    }

    catch(error){
        next(error);
    }
}

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .sort({ createdAt: -1 })
      .populate('replies.userId', 'username profilePicture'); // Populate user details for replies
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const replyToComment = async (req, res) => {
    const { commentId, replyContent } = req.body;
    const userId = req.user.id; // Assuming `req.user` contains the authenticated user's info

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if the user is the owner of the post
        const post = await Post.findById(comment.postId); // Assuming Post model exists
        if (post.userId.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to reply to this comment' });
        }

        // Add the reply to the comment
        comment.replies.push({
            userId,
            content: replyContent,
            createdAt: new Date(),
        });
        await comment.save();

        res.status(200).json({ message: 'Reply added successfully', comment });
    } catch (error) {
        res.status(500).json({ message: 'Error replying to comment', error: error.message });
    }
};

