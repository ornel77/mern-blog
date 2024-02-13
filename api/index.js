import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

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
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
