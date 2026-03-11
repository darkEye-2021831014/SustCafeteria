import jwt from "jsonwebtoken"

export const setUser = (user) => {
    const tokenInfo = {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
    }
    return jwt.sign(tokenInfo, process.env.JWT_SECRET);
}

export const getUser = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}