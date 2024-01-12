import { articleModel } from "../dbConfig/pageDataSchema.js";
import mongoose from 'mongoose'

async function getArticles(req, res) {
    try {
        const numberOfArticles = parseInt(req.params.number);
        if (isNaN(numberOfArticles)) {
            const articles = await articleModel.find().sort({ date: -1 });
            return res.status(200).json({ articles });
        }
        else if (!Number.isInteger(numberOfArticles) || numberOfArticles <= 0) {
            return res.status(400).json({ error: 'Invalid number provided.' });
        }
        else {
            const articles = await articleModel
                .find()
                .sort({ date: -1 })
                .limit(numberOfArticles);

            return res.status(200).json({ articles });
        }
    }
    catch (error) {
        console.error('Error fetching articles:', error.message);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

async function getArticleById(req, res) {
    try {
        var ID = req.params.id;
        console.log(ID);
        if (!ID) {
            return res.status(400).json({ error: 'Article ID is required.' });
        }
        const objectId = mongoose.Types.ObjectId.createFromHexString(ID);

        const article = await articleModel.findById(objectId);
        if (!article) {
            return res.status(404).json({ error: 'Article not found.' });
        }
        return res.status(200).json(article);
    }
    catch (error) {
        console.error('Error fetching articles:', error.message);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

async function uploadArticle(req, res) {
    try {
        const { title, author, header, backgroundImage, text, allowComments, commentsVisibility } = req.body;
        //todo - update article
        console.log(req.body);
        const newArticle = new articleModel({
            title,
            author,
            header,
            backgroundImage,
            text,
            isVisible: true,
            allowComments,
            commentsVisibility,
        });

        await newArticle.save();

        return res.status(201).json({ message: 'Article uploaded successfully.' });
    } catch (error) {
        console.error('Error uploading article:', error.message);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

async function deleteArticle(req, res) {
    try {
        const articleId = req.params.id;
        const deletedArticle = await articleModel.findByIdAndDelete(articleId);

        if (!deletedArticle) {
            return res.status(404).json({ error: 'Article not found.' });
        }

        return res.status(200).json({ message: 'Article deleted successfully.' });
    } catch (error) {
        console.error('Error deleting article:', error.message);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}


async function uploadComment(req, res) {
    try {
        const { articleId, username, text } = req.body;
        const targetArticle = await articleModel.findById(articleId);

        if (!targetArticle) {
            return res.status(404).json({ error: 'Article not found.' });
        }

        targetArticle.comments.push({ username, text });

        await targetArticle.save();

        return res.status(201).json({ message: 'Comment uploaded successfully.' });
    } catch (error) {
        console.error('Error uploading comment:', error.message);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

async function updateArticle(req, res){
    try {
        const articleId = req.params.articleId
        const updatedData = req.body
        const result = await articleModel.updateOne({ _id: articleId }, {$set: updatedData})
        
        if (result.nModified === 0) {
            return res.status(404).json({ error: 'Article not found.' });
        }

        return res.status(200).json({ message: `Article updated successfully.` });
    } catch (error) {
        console.error('Error updating article:', error.message);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

async function deleteComment(req, res) {
    try {
        const articleId = req.params.articleId
        const commentId = req.params.commentId
        const updatedArticle = await articleModel.findOneAndUpdate(
          { _id: articleId },
          { $pull: { comments: { _id: commentId } } },
          { new: true }
        );
    
        if (!updatedArticle) {
            return res.status(404).json({ error: 'Article or comment not found.' });
        }
    
        return res.status(200).json({ message: 'Comment deleted successfully.' });
      } catch (error) {
        console.error('Error deleting comment:', error.message);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
      }
}


export {
    getArticles,
    uploadArticle,
    uploadComment,
    deleteArticle,
    getArticleById,
    updateArticle,
    deleteComment
}