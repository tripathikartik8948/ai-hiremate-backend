import jwt from "jsonwebtoken";
import User from "../model/user.js";
export const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            res.status(401).json({
                message: "Unauthorized - Please Login",
            });
            return;
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({
                message: "Unauthorized - Token Missing",
            });
            return;
        }
        const decodedData = jwt.verify(token, process.env.JWT_SEC);
        if (!decodedData || !decodedData._id) {
            res.status(401).json({
                message: "Invailid Token",
            });
            return;
        }
        const user = await User.findById(decodedData._id);
        if (!user) {
            res.status(401).json({
                message: "Expired Token",
            });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Please Login",
        });
    }
};
