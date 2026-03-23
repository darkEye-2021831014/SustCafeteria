import bcrypt from "bcryptjs";
import * as User from "../models/user.js"

// Hash a plain password
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // 10 rounds of salt
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
};

// Compare plain password with hashed password
export const verifyPassword = async (email, password) => {
    const user = await User.getUserByEmail(email);
    if (!user) return false;

    return await bcrypt.compare(password, user.password);
};