import mongoose from "mongoose";

const schema = new mongoose.Schema({
},
{
  strict: false
});

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now,
      required: true
    },
    header: {
      type: String,
      required: true
    },
    backgroundImage: {
      type: String,
      required: false
    },
    text: {
      type: String,
      required: true
    },
    isVisible: {
      type: Boolean,
      default: true,
      required: true
    },
    allowComments: {
      type: Boolean,
      required: true
    },
    commentsVisibility: {
      type: Boolean,
      required: true
    },
    comments: {
      type: [{
        username: String,
        date: {
          type: Date,
          default: Date.now
        },
        text: String,
      }],
      default: []
    }
  }
);

//TODO new model for every page to make it better
mongoose.set('strictQuery', false);
const pageModel = mongoose.model('pageModel', schema, 'Pages');
const articleModel = mongoose.model('articleModel', articleSchema, 'Articles');
const configModel = mongoose.model('configModel', schema, 'Config')

export {
    pageModel,
    articleModel,
    configModel
}