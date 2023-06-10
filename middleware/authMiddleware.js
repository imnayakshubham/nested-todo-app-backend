import jwt from "jsonwebtoken";
import User from "../Schema/UserSchema.js";

const protect = async (req, res, next) => {
    if (req.headers.token) {
        try {
            //decodes token id
            const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET_KEY);
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if (!req.headers.token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
};

export { protect };
