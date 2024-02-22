import express from 'express';
import { createComment, editComment, getComments, likeComment } from '../controllers/comment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/getComments/:postId', getComments);
router.post('/create', verifyToken, createComment);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);


export default router;
