import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

// its async cause we need to get the result from mongo and it takes time and after we respond to the user
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    next(errorHandler(400, 'All Fields Are Required'));
  }

  // si ok hash pwd
  //   hashSync has already the await functionality so ne need to add it
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // PROBLEME AVEC LE DEPLOYEMENT
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);

  // le sauver dans la db
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json('Sign up successful');
  } catch (error) {
    console.log('Error in signup controller', error.message);
    next(error);
  }
};
