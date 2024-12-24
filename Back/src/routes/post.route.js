import express from 'express';
import { verifyToken } from '../../utils/verifyUser.js';
import { create,getposts,deletePost } from '../controller/post.controller.js';


const router = express.Router();

router.post('/create',verifyToken,create);
router.get('/getposts',getposts);
router.delete('/deletepost/:postId',verifyToken,deletePost);

export default router;