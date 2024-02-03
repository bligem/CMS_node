import User from "../dbConfig/userSchema.js";
import logger from '../dbConfig/loggerConfig.js'

class RolesController {

    async addRole(req, res) {
        try {
            const roleName = req.params.roleName;
            const username = req.body.username;

            const user = await User.findOne({ username: username });

            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            if (user.roles.includes('Protected')) {
                return res.status(403).json({ error: 'User is protected. Roles cannot be changed.' });
            }

            if (!user.roles.includes(roleName)) {
                user.roles.push(roleName);
                await user.save({ validateBeforeSave: false });

                logger.info(`New role ${roleName} has been added for user ${username}`, req)

                return res.status(200).json({ message: 'Role added successfully.' });
            } else {
                return res.status(400).json({ error: 'User already has the specified role.' });
            }
        } catch (error) {
            console.error('Error adding role:', error.message);
            return res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }

    async deleteRole(req, res) {
        try {
            const roleName = req.params.roleName;
            const username = req.body.username;

            const user = await User.findOne({ username: username });

            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            if (user.roles.includes('Protected')) {
                return res.status(403).json({ error: 'User is protected. Roles cannot be changed.' });
            }

            const roleIndex = user.roles.indexOf(roleName);
            if (roleIndex !== -1) {
                user.roles.splice(roleIndex, 1);
                await user.save({ validateBeforeSave: false });

                logger.info(`Role ${roleName} has been deleted from user ${username}`, req)

                return res.status(200).json({ message: 'Role deleted successfully.' });
            } else {
                return res.status(400).json({ error: 'User does not have the specified role.' });
            }
        } catch (error) {
            console.error('Error deleting role:', error.message);
            return res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }

}

export default new RolesController()