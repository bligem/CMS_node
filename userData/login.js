import User from "../dbConfig/userSchema.js";
import bcrypt from 'bcrypt';

async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
            console.log(await bcrypt.compare(password, user.password))
        if (user && (await bcrypt.compare(password, user.password))) {
            if (user.isLocked){
                return res.status(403).json({
                    error: "Authentication failed. User is blocked on portal",
                })
            }
            return res.status(200).json({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: user.roles
            });
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
export default loginUser
