import User from "../dbConfig/userSchema.js";
import logger from '../dbConfig/loggerConfig.js'

async function getUser(req, res) {
  try {
    const username = req.params.name;

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

async function getUserList(req, res) {
  try {
    let limit = req.params.number ? parseInt(req.params.number) : 0
    const number = parseInt(req.params.number)

    if (limit < 0) {
      return res.status(400).json({ error: 'Invalid number provided.' });
    }

    if (limit == 0) {
      const allUsers = await User.find();
      return res.status(200).json(allUsers);
    }

    const userList = await User.find().limit(number);
    return res.status(200).json(userList);
  } catch (error) {
    console.error('Error fetching user list:', error.message);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

async function getUsersByRole(req, res) {
  try {
    const roleName = req.params.roleName;

    if (!roleName) {
      return res.status(400).json({ error: 'Role name is required.' });
    }

    const userList = await User.find({ roles: roleName });

    return res.status(200).json(userList);
  } catch (error) {
    console.error('Error fetching users by role:', error.message);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });

  }
}

async function updateUser(req, res) {
  try {
    const { username } = req.params;
    const { password, email, isLocked } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (password) {
      user.password = password;
    }

    if (email) {
      user.email = email;
    }

    if (isLocked !== undefined) {
      user.isLocked = isLocked;
    }

    await user.save();

    logger.info(`User ${username} has been updated`, req)

    return res.status(200).json({ message: 'User updated successfully.' });
  } catch (error) {
    console.error('Error updating user:', error.message);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

async function lockUser(req, res) {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    user.isLocked = true;
    await user.save();

    logger.info(`User ${username} has been locked`, req)
    return res.status(200).json({ message: 'User account locked successfully.' });
  } catch (error) {
    console.error('Error locking user account:', error.message);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

async function unlockUser(req, res) {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    user.isLocked = false;
    await user.save();

    logger.info(`User ${username} has been unlocked`, req)
    return res.status(200).json({ message: 'User account unlocked successfully.' });
  } catch (error) {
    console.error('Error unlocking user account:', error.message);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const { username } = req.body;

    const userData = await User.findOne({ username });

    if (!userData) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (userData.roles.includes('Protected')) {
      return res.status(403).json({ error: 'User is protected. Cannot delete this user.' });
    }

    const deleteUser = await User.deleteOne({ username })

    logger.info(`User ${username} has been deleted`, req)
    return res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}



export {
  getUser,
  getUserList,
  getUsersByRole,
  updateUser,
  lockUser,
  unlockUser,
  deleteUser
}