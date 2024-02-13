import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

// its async cause we need to get the result from mongo and it takes time and after we respond to the user
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // si ok hash pwd
  //   hashSync has already the await functionality so ne need to add it
  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    // le sauver dans la db
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json('Sign up successful');
  } catch (error) {
    console.log('Error in signup controller', error.message);
    res.status(500).json({ message: error.message });
  }
};
