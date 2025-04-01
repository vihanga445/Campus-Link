import express from 'express';
import { verifyToken } from '../../utils/verifyUser.js';

import {
    initiateConversation,
    sendMessage,
    getConversations,
    getMessages
} from '../controller/message.controller.js';

const router = express.Router();

router.post('/initiate', verifyToken, initiateConversation);
router.post('/send', verifyToken, sendMessage);
router.get('/conversations', verifyToken, getConversations);
router.get('/messages/:conversationId', verifyToken, getMessages);


export default router;
