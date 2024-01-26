import { pageModel, configModel } from "../dbConfig/pageDataSchema.js";
import logger from '../dbConfig/loggerConfig.js'

async function getPage(req, res) {
    try {
        const name = req.params.pageName;

        const pageData = await pageModel.findOne({ _id: name });
        if (!pageData) {
            return res.status(404).json({ error: 'Page not found.' });
        }
        const configData = await configModel.findOne({ configType: "Global" })

        const combinedDoc = {
            page: pageData,
            config: configData,
        };

        return res.status(200).json(combinedDoc);
    }
    catch (error) {
        console.error('Error fetching pages:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getPages(req, res) {
    try {
        const pageData = await pageModel.find();
        console.log(pageData)
        if (!pageData) {
            return res.status(404).json({ error: 'Page not found.' });
        }
        return res.status(200).json(pageData);
    }
    catch (error) {
        console.error('Error fetching pages:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function uploadPage(req, res) {
    try {
        const { pageName, header, description, ...params } = req.body
        const _id = pageName;

        const check = await pageModel.findOne({ _id: _id })

        if (check) {
            return res.status(400).json({ error: 'Page name already exists. Please choose another page name.' });
        }

        const pageData = new pageModel({
            _id,
            pageName,
            header,
            description,
            ...params,
        });
        await pageData.save()

        const globalDocument = await pageModel.findOne({ configType: "Global" });

        if (globalDocument) {
            globalDocument.menu.push({
                itemName: pageName,
                visibility: 'none',
            });
            await globalDocument.save();
        }

        logger.info(`New page ${pageName} has been uploaded`, req)

        return res.status(201).json({ message: 'Page uploaded successfully.' });
    } catch (error) {
        console.error('Error uploading page:', error.message);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

async function updatePage(req, res) {
    try {
        const pageName = req.params.pageName
        const updatedData = req.body
        const result = await pageModel.updateOne({ pageName }, { $set: updatedData })

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Page not found.' });
        }

        logger.info(`Page ${pageName} has been updated`, req)
        return res.status(200).json({ message: `Page ${pageName} updated successfully.` });
    } catch (error) {
        console.error('Error updating page:', error.message);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

async function deletePage(req, res) {
    try {
        const name = req.params.pageName;
        const deletedPage = await pageModel.deleteOne({ pageName: name })

        if (!deletedPage) {
            return res.status(404).json({ error: 'Page not found.' });
        }

        logger.info(`Page ${name} has been deleted`, req)
        return res.status(200).json({ message: 'Page deleted successfully.' });
    } catch (error) {
        console.error('Error deleting page:', error.message);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}


export {
    getPage,
    getPages,
    uploadPage,
    updatePage,
    deletePage
}