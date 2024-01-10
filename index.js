import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import pageRoutes from './routes/pageRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config();

const app = express()
const port = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/user', userRoutes)
app.use('/page', pageRoutes)

mongoose.connect(`mongodb+srv://Mt01:ylxVKsen6ShdKoFj@cmsblog.hbipaz5.mongodb.net/CMSBlog?retryWrites=true&w=majority`, {
//mongoose.connect(`mongodb://${process.env.DB_USERNAME}${process.env.DB_PASSWORD}@mongodb:27017/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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