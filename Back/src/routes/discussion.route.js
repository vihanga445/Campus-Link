import express from 'express'; 
import { verifyToken } from '../../utils/verifyUser.js';


import { createDiscussion, getDiscussions, addComment } from '../controller/discussionController.js'
const router = express.Router();

router.post('/create',verifyToken, createDiscussion); // Create a new discussion
router.get('/:eventId',verifyToken, getDiscussions); // Get all discussions for an event
router.post('/:discussionId/comment',verifyToken, addComment); // Add a comment to a discussion

export default router;