import User from '../dbConfig/userSchema.js';
import bcrypt from 'bcrypt';
import logger from '../dbConfig/loggerConfig.js'

async function registerUser(req, res) {
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

export default registerUser