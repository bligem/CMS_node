import User from '../dbConfig/userSchema.js';

async function registerUser(req, res) {
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ error: 'Username, password, and email are required.' });
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

        const newUser = new User({
            username,
            password,
            email,
        });

        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error registering user:', error.message);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}

export default registerUser