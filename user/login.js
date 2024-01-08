import User from "../dbConfig/userSchema";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { userId: user._id, username: user.username },
                jwtSecretKey,
                { expiresIn: "1h" }
            );
            return res.status(200).json({ token });
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
export default loginUser;
