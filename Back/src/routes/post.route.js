import express from 'express';
import { verifyToken } from '../../utils/verifyUser.js';
import { create,getposts,deletePost,updatePost,moderatePost,getPendingPosts,getRejectedPosts} from '../controller/post.controller.js';


const router = express.Router();

router.post('/create',verifyToken,create);
router.get('/getposts',getposts);
router.delete('/deletepost/:postId',verifyToken,deletePost);
router.put('/updatepost/:postId/:userId',verifyToken,updatePost);

router.put('/moderate/:postId',verifyToken,moderatePost);

router.get('/pending-posts',verifyToken,getPendingPosts);
router.get('/rejected-posts',verifyToken,getRejectedPosts);


export default router;
