import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const authMiddleware = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        console.log(token);

        if (!token || !token.startsWith("Bearer")) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }

        token = token.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized, invalid token" });
    }
};
