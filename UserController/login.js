import User from "../dbConfig/userSchema.js";
import bcrypt from 'bcrypt';

async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user) {
            if (user.isLocked) {
                return res.status(401).json({
                    error: "Authentication failed. Invalid username or password.1",
                });
            }
            
            const isCorrectPassword = await bcrypt.compare(password, user.password);
            console.log(isCorrectPassword)
            if (isCorrectPassword) {
                user.failedLoginAttempts = 0;
                await user.save();

                return res.status(200).json({
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    roles: user.roles,
                });
            } else {
                user.failedLoginAttempts += 1;
                user.lastFailedLoginAttempt = new Date();

                if (user.lastFailedLoginAttempt >= 10){
                    user.isLocked = true;
                }
                
                await user.save();
                return res.status(401).json({
                    error: "Authentication failed. Invalid username or password.2",
                });
            }
        } else {
            return res.status(401).json({
                error: "Authentication failed. Invalid username or password.3",
            });
        }
    } catch (error) {
        console.error("Error during login:", error.message);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}
export default loginUser
