import User from "../dbConfig/userSchema.js";

async function addRole(req, res) {
    try {
        const roleName = req.params;
        const username = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        if (!user.roles.includes(roleName)) {
            user.roles.push(roleName);
            await user.save();
            return res.status(200).json({ message: 'Role added successfully.' });
        } else {
            return res.status(400).json({ error: 'User already has the specified role.' });
        }
    } catch (error) {
        console.error('Error adding role:', error.message);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

async function deleteRole(req, res) {
    try {
        const roleName = req.params;
        const username = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const roleIndex = user.roles.indexOf(roleName);
        if (roleIndex !== -1) {
            user.roles.splice(roleIndex, 1);
            await user.save();
            return res.status(200).json({ message: 'Role deleted successfully.' });
        } else {
            return res.status(400).json({ error: 'User does not have the specified role.' });
        }
    } catch (error) {
        console.error('Error deleting role:', error.message);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

export {
    addRole,
    deleteRole
}