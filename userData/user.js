import User from "../dbConfig/userSchema.js";
import bcrypt from 'bcrypt';

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
    let limit = req.params.number ? parseInt(req.params.number) : 0;
    const number = parseInt(req.params.number)

    if (limit <= 0) {
      return res.status(400).json({ error: 'Invalid number provided.' });
    }

    if (isNaN(limit)) {
      const allUsers = await User.find();
      return res.status(200).json(allUsers);
    }

    const userList = await UserModel.find().limit(number);
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
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    if (email) {
      user.email = email;
    }

    if (isLocked !== undefined) {
      user.isLocked = isLocked;
    }

    await user.save();

    return res.status(200).json({ message: 'User updated successfully.' });
  } catch (error) {
    console.error('Error updating user:', error.message);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

async function lockUser(req, res) {
  try {
    const { username } = req.params;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    user.isLocked = true;
    await user.save();

    return res.status(200).json({ message: 'User account locked successfully.' });
  } catch (error) {
    console.error('Error locking user account:', error.message);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

async function unlockUser(req, res) {
  try {
    const { username } = req.params;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Unlock the user account
    user.isLocked = false;
    await user.save();

    return res.status(200).json({ message: 'User account unlocked successfully.' });
  } catch (error) {
    console.error('Error unlocking user account:', error.message);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

export {
  getUser,
  getUserList,
  getUsersByRole,
  updateUser,
  lockUser,
  unlockUser
}