import { articleModel } from "../dbConfig/pageDataSchema";

async function getArticles(req, res) {
    try {
        const numberOfArticles = parseInt(req.params.number);

        if (!Number.isInteger(numberOfArticles) || numberOfArticles <= 0) {
            return res.status(400).json({ error: 'Invalid number provided.' });
        }

        const articles = await articleModel
            .find()
            .sort({ date: -1 })
            .limit(numberOfArticles);

        return res.status(200).json({ articles });
    }
    catch (error) {
        console.error('Error fetching articles:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function uploadArticle(req, res) {
    try {
        const { title, author, header, backgroundImage, text, allowComments, commentsVisibility } = req.body;

        const newArticle = new articleModel({
            title,
            author,
            date: getCurrentDate(),
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
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

function getCurrentDate() {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    return formattedDate;
}


export {
    getArticles,
    uploadArticle
}