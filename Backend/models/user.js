import { db } from "../config/db.js"


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
        await db.query(query);
        console.log("Users table created successfully");
    }
    catch (err) {
        console.error("Error craating user table", err);
    }
};

export const addUser = async (user) => {
    const { name, email, password, role, contact, join_date, address, image } = user;
    const query = `
        INSERT INTO users 
        (name, email, password, role, contact, join_date, address,image)
        VALUES (?, ?, ?, ?, ?, ?, ?,?)
    `;
    const [result] = await db.query(query, [name, email, password, role, contact, join_date, address, image]);
    return result.insertId;
};

export const getAllUsers = async () => {
    const [rows] = await db.query("SELECT * FROM users");
    return rows;
};

export const getUserByEmail = async (email) => {
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.query(query, [email]);
    return rows.length > 0 ? rows[0] : null;
};

export const getUserById = async (id) => {
    const query = "SELECT * FROM users WHERE id = ?";
    const [rows] = await db.query(query, [id]);
    return rows.length > 0 ? rows[0] : null;
}