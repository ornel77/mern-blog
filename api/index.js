import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'

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
app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)






app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
