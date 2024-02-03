import User from "../dbConfig/userSchema.js";
import logger from '../dbConfig/loggerConfig.js'
import bcrypt from 'bcrypt';

class UserController {

  async loginUser(req, res) {

    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (user) {
        if (user.isLocked) {
          return res.status(401).json({
            error: "Authentication failed. Invalid username or password.",
          });
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        console.log(isCorrectPassword)
        if (isCorrectPassword) {
          user.failedLoginAttempts = 0;
          await user.save();

          logger.info(`User ${username} has logged in`, req)

          return res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: user.roles,
          });
        } else {
          user.failedLoginAttempts += 1;
          user.lastFailedLoginAttempt = new Date();

          if (user.lastFailedLoginAttempt >= 10) {
            user.isLocked = true;
          }

          await user.save();

          logger.error(`Invalid login attempt by user ${username}`, req)

          return res.status(401).json({
            error: "Authentication failed. Invalid username or password.",
          });
        }
      } else {
        return res.status(401).json({
          error: "Authentication failed. Invalid username or password.",
        });
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  }

  async registerUser(req, res) {
    try {
      const { username, password, email } = req.body;
      const passwordRegex = /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,18}$/;
      if (!username || !password || !email) {
        return res.status(400).json({ error: 'Username, password, and email are required.' });
      }

      if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'Password must meet the specified criteria.' });
      }

      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });

      if (existingUser) {
        if (existingUser.username === username) {
          return res.status(400).json({ error: 'Username already exists. Please choose another username.' });
        } else if (existingUser.email.toLocaleLowerCase() === email.toLocaleLowerCase()) {
          return res.status(400).json({ error: 'Email address is already in use. Please use a different email.' });
        }
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        password: hashedPassword,
        email,
      });

      await newUser.save();
      logger.info(`New user has been registered. ${username}`, req)
      return res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
      console.error('Error registering user:', error.message);
      return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  }



  async getUser(req, res) {
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

  async getUserList(req, res) {
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

  async getUsersByRole(req, res) {
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

  async updateUser(req, res) {
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

  async lockUser(req, res) {
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

  async unlockUser(req, res) {
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

  async deleteUser(req, res) {
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

}

export default new UserController()