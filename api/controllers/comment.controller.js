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
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(errorHandler(404, 'Comment not found'));
    }

    // on veut savoir si le user à déjà commenter ce post
    const userIndex = comment.likes.indexOf(req.user.id);
    // si on le trouve pas on le rajoute à l'array des likes sinon on le supprime
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }

    await comment.save();
    res.status(200).json(comment)
  } catch (error) {
    next(error);
  }
};
export const editComment = async (req, res, next) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(errorHandler(404, 'Comment not found'));
    }

    // Check is the person is the owner of the comment and is an admin
    if(comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(errorHandler(403, "Unauthorized to edit this comment"))
    }
    // if ok we get back our comment et updated it with the new content
    const editedComment = await Comment.findByIdAndUpdate(commentId, {
      content: req.body.content
    }, {new: true})

    res.status(200).json(editedComment)
    
  } catch (error) {
    next(error);
  }
};
