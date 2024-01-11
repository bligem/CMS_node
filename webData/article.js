import { articleModel } from "../dbConfig/pageDataSchema.js";

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
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getArticleById(req, res) {
    try {
        const ID = parseInt(req.params.id);
        if (!ID) {
            return res.status(400).json({ error: 'Article ID is required.' });
        }
        const article = await articleModel.findById(ID);
        if (!article) {
            return res.status(404).json({ error: 'Article not found.' });
        }
        return res.status(200).json(article);
    }
    catch (error) {
        console.error('Error fetching articles:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function uploadArticle(req, res) {
    try {
        const { title, author, header, backgroundImage, text, allowComments, commentsVisibility } = req.body;
        //todo - update article
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
        const articleId = req.params.articleId;
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


export {
    getArticles,
    uploadArticle,
    uploadComment,
    deleteArticle,
    getArticleById
}