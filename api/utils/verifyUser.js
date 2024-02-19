import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  // get the token from the cookie of the browser
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, 'Unauthorized'));
  }
  // verify whose is that token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Unauthorized'));
    }
    req.user = user;
    next();
  });
};
