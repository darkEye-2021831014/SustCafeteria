import * as User from "../models/user.js";
import { verifyPassword, hashPassword } from "../utils/auth.js";
import { setUser } from "./auth.js";

// ===================== AUTH =====================

export const addUser = async (user) => {
    user.password = await hashPassword(user.password);
    const userId = await User.addUser(user);
    return userId;
};

export const validateUser = async (email, password) => {
    const isValid = await verifyPassword(email, password);
    if (!isValid) return null;

    const user = await User.getUserByEmail(email);
    const token = setUser(user);
    return token;
};

// ===================== GET =====================

export const getAllUsers = async () => {
    return await User.getAllUsers();
};

export const getUserById = async (id) => {
    return await User.getUserById(id);
};

export const getUserByEmail = async (email) => {
    return await User.getUserByEmail(email);
};

export const getAllUsersExcept = async (id) => {
    return await User.getAllUsersExcept(id);
};

// ===================== DELETE =====================

export const deleteAllUsersExcept = async (id) => {
    return await User.deleteAllUsersExcept(id);
};

export const deleteUserById = async (userId) => {
    const user = await User.getUserById(userId);
    if (!user) throw new Error("User not found");


    const deleted = await User.deleteUserById(userId);
    return deleted;
};

// ===================== UPDATE =====================

export const updateUserService = async (id, updates) => {
    const fieldsToUpdate = {};

    if (updates.oldPassword && updates.newPassword) {
        const user = await User.getUserById(id);

        const valid = await verifyPassword(user.email, updates.oldPassword);
        if (!valid) throw new Error("Old password is incorrect");

        fieldsToUpdate.password = await hashPassword(updates.newPassword);
    }
    else if (updates.oldPassword || updates.newPassword) {
        throw new Error("Both oldPassword and newPassword must be provided");
    }

    if (updates.name) fieldsToUpdate.name = updates.name;
    if (updates.contact) fieldsToUpdate.contact = updates.contact;
    if (updates.address) fieldsToUpdate.address = updates.address;

    if (updates.image) {
        try {
            new URL(updates.image);
            fieldsToUpdate.image = updates.image;
        } catch {
            throw new Error("Invalid image URL");
        }
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
        throw new Error("No valid fields to update");
    }

    const updated = await User.updateUserDB(id, fieldsToUpdate);
    return updated;
};

// ===================== ROLE =====================

export const updateUserRole = async (id, role) => {
    const updated = await User.updateUserRole(id, role);

    if (!updated) {
        throw new Error("User not found");
    }

    return true;
};