import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'


import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/post.routes.js'
import commentRoutes from './routes/comment.routes.js'

dotenv.config();

// Connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json())
app.use(cookieParser())
app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)


// error middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})






app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
