import { getUser } from "../services/auth.js"

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
            return res.status(403).json({ msg: "Access Forbidden" });
        }
        next();
    };
};