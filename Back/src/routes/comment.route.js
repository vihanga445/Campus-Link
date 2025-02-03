import express from "express"; 
import { verifyToken } from "../../utils/verifyUser.js";
import { createComment,getComments } from "../controller/comment.controller.js";

const router = express.Router();


router.post('/create',verifyToken,createComment);
router.get('/getcomments/:postId',getComments)


export default router;