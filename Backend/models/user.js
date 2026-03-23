import { db } from "../config/db.js";

// roles = ['NORMAL', 'ADMIN']
export const createUserTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(50) DEFAULT 'NORMAL',
            contact VARCHAR(20),
            join_date DATE,
            address VARCHAR(255),
            image VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
    try {
        await db.execute(query);
        console.log("Users table created successfully");
    } catch (err) {
        console.error("Error creating user table", err);
    }
};

export const addUser = async (user) => {
    const { name, email, password, role, contact, join_date, address, image } = user;
    const query = `
        INSERT INTO users 
        (name, email, password, role, contact, join_date, address, image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [name, email, password, role, contact, join_date, address, image]);
    return result.insertId;
};

export const getAllUsers = async () => {
    const [rows] = await db.execute("SELECT id, name, email, role, contact, join_date, address, image FROM users");
    return rows;
};

export const getUserByEmail = async (email) => {
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.execute(query, [email]);
    return rows.length > 0 ? rows[0] : null;
};

export const getUserById = async (id) => {
    const query = "SELECT id, name, email, role, contact, join_date, address, image FROM users WHERE id = ?";
    const [rows] = await db.execute(query, [id]);
    return rows.length > 0 ? rows[0] : null;
};

export const getAllUsersExcept = async (id) => {
    const query = "SELECT * FROM users WHERE id != ?";
    const [rows] = await db.execute(query, [id]);
    return rows;
};

export const deleteAllUsersExcept = async (id) => {
    const query = "DELETE FROM users WHERE id != ?";
    await db.execute(query, [id]);
};

export const updateUserById = async (id, fields) => {
    const keys = Object.keys(fields);
    if (keys.length === 0) return false;

    const setClause = keys.map(key => `${key} = ?`).join(", ");
    const values = keys.map(key => fields[key]);

    const query = `UPDATE users SET ${setClause} WHERE id = ?`;
    const [result] = await db.execute(query, [...values, id]);

    return result.affectedRows > 0;
};

export const deleteUserById = async (id) => {
    const query = "DELETE FROM users WHERE id = ?";
    const [result] = await db.execute(query, [id]);
    return result.affectedRows > 0;
};

export const updateUserRole = async (id, role) => {
    const query = "UPDATE users SET role = ? WHERE id = ?";
    const [result] = await db.execute(query, [role, id]);
    return result.affectedRows > 0;
}