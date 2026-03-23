import jwt from "jsonwebtoken"

export const setUser = async (user) => {
    const tokenInfo = {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
    }
    return await jwt.sign(tokenInfo, process.env.JWT_SECRET);
}

export const getUser = async (token) => {
    return await jwt.verify(token, process.env.JWT_SECRET);
}
