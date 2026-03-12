import * as User from "../models/user.js"
import { verifyPassword, hashPassword } from "../utils/auth.js"
import { setUser } from "./auth.js";

export const addUser = async (user) => {
    user.password = await hashPassword(user.password);
    const userId = await User.addUser(user);
    return userId;
}

export const validateUser = async (email, password) => {
    const user = await User.getUserByEmail(email); // await here
    if (!user) return null;

    const isValid = await verifyPassword(password, user.password); // await here
    if (!isValid) return null;

    const token = setUser(user); // pass the user object
    return token;
};

export const getAllUsers = async () => {
    return await User.getAllUsers();
}

export const getUserById = async (id) => {
    return await User.getUserById(id);
}