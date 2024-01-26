import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import pageRoutes from './Routes/pageRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import cors from 'cors'

dotenv.config();

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json());

app.use('/user', userRoutes)
app.use('/page', pageRoutes)

mongoose.connect(`${process.env.DB}`, {
  })
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error.message);
    });