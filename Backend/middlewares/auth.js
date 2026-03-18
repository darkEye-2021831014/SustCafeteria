import { getUser } from "../services/auth.js"
import { getUserByEmail } from "../models/user.js";

//Duplicate Email
export const verifyEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(400).json({ msg: "Email is required" });

        const user = await getUserByEmail(email);
        if (user)
            return res.status(409).json({ msg: "User Already Exists!" });

        next();
    } catch (err) {
        res.status(500).json({ msg: `Error in email Verification: ${err.message}` });
    }
};

//Authentication
export const verifyUser = async (req, res, next) => {
    const token = req.cookies?.token;
    req.user = null;
    if (!token) return next();

    const user = await getUser(token);
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

export const loginRequired = restrictTo(['NORMAL', 'ADMIN']);