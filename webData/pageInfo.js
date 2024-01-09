import { pageModel, configModel } from "../dbConfig/pageDataSchema";

async function getPage(req, res) {
    try {
        const name = req.params.pageName;

        const pageData = await pageModel.findOne({_id: name});
        const configData = await configModel.findOne({configType: "Global"})

        const combinedDoc = {
            page: pageData,
            config: configData,
          };

        return res.status(200).json(combinedDoc);
    }
    catch (error) {
        console.error('Error fetching articles:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function uploadPage(req, res) {//todo
    try {
        return res.status(201).json({ message: 'Article uploaded successfully.' });
    } catch (error) {
        console.error('Error uploading article:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export {
    getPage,
}