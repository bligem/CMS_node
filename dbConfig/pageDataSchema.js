import mongoose from "mongoose";

const schema = new mongoose.Schema({
    _id: {type: String}
},
{
  strict: false
});
//TODO new model for every page to make it better
mongoose.set('strictQuery', false);
const pageModel = mongoose.model('pageModel', schema, 'Pages');
const articleModel = mongoose.model('articleModel', schema, 'Articles');
const configModel = mongoose.model('configModel', schema, 'Config')

export {
    pageModel,
    articleModel,
    configModel
}