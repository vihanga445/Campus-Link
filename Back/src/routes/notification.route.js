import express from 'express';
import { verifyToken } from '../../utils/verifyUser.js';
import { getUserNotifications,markAsRead } from '../controller/notification.controller.js';


const router = express.Router();


router.get('/',verifyToken,getUserNotifications);
router.put('/:id/read',verifyToken,markAsRead);

export default router;