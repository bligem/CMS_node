import { configModel } from "../dbConfig/pageDataSchema.js";
import { ROLES } from "../dbConfig/userSchema.js"
import logger from '../dbConfig/loggerConfig.js'

class ConfigController {

    async getConfig(req, res) {
        try {
            const configType = req.params.configId;
            const configData = await configModel.findOne({ 'configType': configType })
            console.log(configType)
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
    async uploadConfig(req, res) {
        try {
            const { configType, ...params } = req.body;
            const check = await configModel.findOne({ configType: configType })

            if (check) {
                return res.status(400).json({ error: 'Config type already exists. Please choose another type.' });
            }

            const configData = new configModel({
                configType,
                ...params
            })

            await configData.save()
            logger.info(`new config ${configType} has been uploaded`, req)
            return res.status(201).json({ message: 'Config uploaded successfully.' });
        } catch (error) {
            console.error('Error uploading config:', error.message);
            return res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }

    async updateConfig(req, res) {
        try {
            const configType = req.params.configType;
            const updatedData = req.body;
            const result = await configModel.updateOne(
                { configType },
                { $set: updatedData }
            );

            if (result.matchedCount === 0) {
                return res.status(404).json({ error: 'Config not found.' });
            }

            logger.info(`Config ${configType} has been updated`, req)
            return res.status(200).json({ message: `Config ${configType} updated successfully.` });
        } catch (error) {
            console.error('Error uploading config:', error.message);
            return res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }

    async getRoles(req, res) {
        try {
            return res.status(200).json({ roles: ROLES });
        } catch (error) {
            console.error('Error fetching roles:', error.message);
            return res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }

}

export default new ConfigController()
