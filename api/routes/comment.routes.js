import express from 'express';
import { createComment, getComments } from '../controllers/comment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/getComments/:postId', getComments);
router.post('/create', verifyToken, createComment);

export default router;
