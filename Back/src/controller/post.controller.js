import Post from '../model/post.model.js';
import User from '../model/user.js';

import { errorHandler } from '../../utils/error.js';

export const create = async(req,res,next)=>{

    console.log('Request Body:', req.body);
    console.log('User:', req.user);
  
    if(!req.user){
        return next(errorHandler(401,'You are not authorized to create a post'));
    }

    if(!req.body.title || !req.body.content){
        return next(errorHandler(400,'please provide all required fields'));
    }

    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');

    const  newPost = new Post({
        ...req.body,
        slug,
        userId:req.user.id,
    });

    try{
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    }catch(error){
        next(error);
    }

};

export const getPendingPosts = async(req,res,next)=>{
    
    try{
        const user = await User.findById(req.user.id);
        if(!user.moderatorRole.isModerator){
            return next(errorHandler(403,'only moderators can access  pending posts'));
        }
        const pendingPosts = await Post.find({
            status:'pending',
            category:user.moderatorRole.category,
        }).populate('userId','username email');
        res.status(200).json(pendingPosts);
    }catch(error){
        next(error);
    }
};

export const moderatePost = async (req, res, next) => {
    try {
        const { status, rejectionReason } = req.body;
        const { postId } = req.params;

        // Verify moderator and their permissions
        const user = await User.findById(req.user.id);

        if (!user.moderatorRole.isModerator) {
            return next(errorHandler(403, 'Only moderators can moderate posts'));
        }

        const post = await Post.findById(postId);
        if (!post) {
            return next(errorHandler(404, 'Post not found'));
        }

        // Check if moderator is assigned to this category
        if (post.category !== user.moderatorRole.category) {
            return next(errorHandler(403, 'You can only moderate posts in your assigned category'));
        }

        // Update post status
        post.status = status;
        post.moderationDetails = {
            moderatorId: user._id,
            rejectionReason: status === 'rejected' ? rejectionReason : '',
            moderatedAt: new Date()
        };

        await post.save();

        res.status(200).json({
            message: `Post has been ${status}`,
            post
        });
    } catch (error) {
        next(error);
    }
};


export const getposts = async(req,res,next)=>{

    try{
        const startIndex = parseInt(req.query.startIndex)||0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1 ;
        const posts = await Post.find({

            status:'approved',
            ...(req.query.userId && {userId:req.query.userId}),
            ...(req.query.category && {category:req.query.category}),
            ...(req.query.slug && {slug:req.query.slug}),
            ...(req.query.postId && {_id: req.query.postId}),
            ...(req.query.searchTerm && {
                $or: [
                  { title: { $regex: req.query.searchTerm, $options: 'i' } },
                  { content: { $regex: req.query.searchTerm, $options: 'i' } },
                ],
              }),

 })
        .sort({updatedAt:sortDirection})
        .skip(startIndex)
        .limit(limit);

        const totalPosts = await Post.countDocuments();

        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate(),
        );

        const lastMonthPosts = await Post.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        })

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts,
        });
    }catch(error){
        next(error);
    }

};

export const deletePost = async(req,res,next)=>{
    if(!req.user){
        return next(errorHandler(401,'You are not authorized to delete a post'));
    }
    try{
        await Post.findByIdAndDelete(req.params.postId);
       
        res.status(200).json('Post deleted successfully');
    }catch(error){
        next(error);
    }
};

export const updatePost = async (req,res,next)=>{

  if(!req.user || req.user.id !== req.params.userId){
      return next(errorHandler(403 ,'You are not authorized to update this post'));

   }

   try{

         const updatePost = await Post.findByIdAndUpdate(req.params.postId,{
            $set:{
                title:req.body.title,
                content:req.body.content,
                category:req.body.category,
                image:req.body.image,
            },
         },{new:true});

            res.status(200).json(updatePost);

   }
   catch(error){
       next(error);
   }

}


export const getRejectedPosts = async(req,res,next)=>{
    try{
        const rejectedPosts = await Post.find({
            userId: req.user.id,
            status: 'rejected',
        }).sort({updatedAt: -1});
        res.status(200).json(rejectedPosts);
    }
    catch(error){
        next(error);
    }
};


export const savePost = async(req,res,next)=>{
    try{
         const user = await User.findById(req.user.id);
         if(!user.savedPosts.includes(req.params.postId)){
            user.savedPosts.push(req.params.postId);
            await user.save() ;
        }
         res.status(200).json('Post saved successfully');
    }
    catch(error){
        next(error);
    }
}


export const getSavedPosts = async(req,res,next)=>{
    try{
        const user = await User.findById(req.user.id).populate('savedPosts');
        res.status(200).json(user.savedPosts);
    } catch(error){
        res.status(500).json(error);
    }
}