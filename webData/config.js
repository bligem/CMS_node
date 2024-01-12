import { configModel } from "../dbConfig/pageDataSchema.js";
import { ROLES } from "../dbConfig/userSchema.js"

async function getConfig(req, res) {
    try {
        const ID = req.param.configId;
        const configData = await configModel.findOne({ _id: ID })
        if (!configData) {
            return res.status(404).json({ error: 'Config not found.' });
        }
        return res.status(200).json(configData);
    }
    catch (error) {
        console.error('Error fetching config:', error.message);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}
async function uploadConfig(req, res){
    try {
        const {configType, ...params} = req.body;
        const check = await configModel.findOne({configType: configType})

        if (check){
            return res.status(400).json({ error: 'Config type already exists. Please choose another type.' });
        }

        const configData = new configModel({
            configType,
            ...params
        })

        await configData.save()
        return res.status(201).json({ message: 'Config uploaded successfully.' });
    } catch (error) {
        console.error('Error uploading config:', error.message);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

async function updateConfig(req, res){
    try {
        const configType = req.params.configType;
        const updatedData = req.body;
        const result = await configModel.updateOne(
            { configType },
            { $set: updatedData }
        );

        if (result.nModified === 0) {
            return res.status(404).json({ error: 'Config not found.' });
        }

        return res.status(200).json({ message: `Config ${configType} updated successfully.` });
    } catch (error) {
        console.error('Error uploading config:', error.message);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

async function getRoles(req, res) {
    try {
      return res.status(200).json({ roles: ROLES });
    } catch (error) {
      console.error('Error fetching roles:', error.message);
      return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  }

export {
    getConfig,
    uploadConfig,
    updateConfig,
    getRoles
}