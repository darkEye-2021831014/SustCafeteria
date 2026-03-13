import { getUser } from "../services/auth.js"
import { getUserByEmail } from "../models/user.js";
import fs from "fs";

//Duplicate Email
export const verifyEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            // Delete uploaded file if exists
            if (req.file) fs.unlinkSync(req.file.path);
            return res.status(400).json({ msg: "Email is required" });
        }

        const user = await getUserByEmail(email);
        if (user) {
            // Delete uploaded file if exists
            if (req.file) fs.unlinkSync(req.file.path);

            return res.status(409).json({ msg: "User Already Exists!" });
        }

        next();
    } catch (err) {
        // Delete uploaded file in case of error
        if (req.file) fs.unlinkSync(req.file.path);
        res.status(500).json({ msg: `Error in email Verification: ${err.message}` });
    }
};



//Authentication
export const verifyUser = (req, res, next) => {
    const token = req.cookies?.token;
    req.user = null;
    if (!token) return next();

    const user = getUser(token);
    req.user = user;
    return next();
}

// Authrization
export const restrictTo = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ msg: "Unauthorized" });
        }
        next();
    };
};