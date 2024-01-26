import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import pageRoutes from './Routes/pageRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import cors from 'cors'

dotenv.config();

const app = express()

app.use(cors())
app.use(express.json());

app.use('/user', userRoutes)
app.use('/page', pageRoutes)

mongoose.connect(`${process.env.DB}`, {
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error.message);
    });

app.get("/test", (req, res) => {
  res.status(200).send({ message: "Hello World!" });
  logger.info(
      `Test request | [URL ${req.originalUrl}] [METHOD: ${req.method}] [IP ${req.ip}]`
  );
});

export default app