import { getUser } from "../services/auth.js"

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