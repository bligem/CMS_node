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
//mongoose.connect(`mongodb://${process.env.DB_USERNAME}${process.env.DB_PASSWORD}@mongodb:27017/${process.env.DB_NAME}`, {
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error.message);
    });

export default app