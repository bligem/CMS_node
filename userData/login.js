import User from "../dbConfig/userSchema.js";
import bcrypt from 'bcrypt';

async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {

            return res.status(200).json(user.roles);
        } else {
            return res.status(401).json({
                error: "Authentication failed. Invalid username or password.",
            });
        }
    } catch (error) {
        console.error("Error during login:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
export default loginUser
