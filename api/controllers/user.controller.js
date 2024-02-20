import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password')
    // const users = await User.find({}).select('_id username email profilePicture')
    // const users = await User.find({},'_id username email profilePicture')
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  const { username, email, profilePicture } = req.body;
  const { userId } = req.params;

  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }

  if (req.body.password) {
    if (req.body.password < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters'));
    }
    // else we hash it
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (username) {
    if (username.length < 4 || username.length > 20) {
      return next(
        errorHandler(400, 'Username must be between 4 and 20 characters')
      );
    }
    if (username.includes(' ')) {
      return next(errorHandler(400, 'Username cannot include spaces'));
    }
    if (username !== username.toLowerCase()) {
      return next(errorHandler(400, 'Username must be lowercase'));
    }
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, 'Username can only contain letters and numbers')
      );
    }
  }
  try {
    // const userDbByUsername = await User.find({ $and : [username, {"_id:" {$ne: req.user.id}}] });
    // const userDbByEmail = await User.findOne({ email });
    // if (userDbByUsername) {
    //   return next(errorHandler(400, 'This email or usernmame is taken'));
    // }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          username,
          email,
          profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


export const deleteUser = async (req, res, next) => {
  const {userId} = req.params
  if(req.user.id !== userId) {
    return(next(errorHandler(403, "You are not allowed to delete this user")))
  }

  try {
    await User.findByIdAndDelete(userId)
    res.status(200).json("User has been deleted")
  } catch (error) {
    next(error)
  }
}



