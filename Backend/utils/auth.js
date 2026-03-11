import bcrypt from "bcryptjs";

// Hash a plain password
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // 10 rounds of salt
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
};

// Compare plain password with hashed password
export const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};