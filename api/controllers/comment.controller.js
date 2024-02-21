import Comment from '../models/comment.model.js';
import { errorHandler } from '../utils/error.js';

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    if (userId !== req.user.id) {
      return next(errorHandler(403, 'Unauthorized to comment'));
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  const { postId } = req.params;
  try {
    // récupérer les commentaires selon l'id du post
    const comments = await Comment.find({ postId }).sort({createdAt: -1})
    res.status(200).json(comments)

  } catch (error) {
    next(error)
  }
};
