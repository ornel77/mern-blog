import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { create, deletePost, getposts } from '../controllers/post.controller.js'

const router = express.Router()

router.get('/getposts', getposts)
router.post('/create', verifyToken, create)
router.delete('/delete/:postId/:userId', verifyToken, deletePost)

export default router