import { db } from "../config/db.js";

export const createSupplierTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS supplier (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            contact VARCHAR(20),
            email VARCHAR(100),
            address VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
    try {
        await db.query(query);
        console.log("Supplier table created successfully");
    } catch (err) {
        console.error("Error creating supplier table", err);
    }
};

export const addSupplier = async (supplier) => {
    const { name, contact, email, address } = supplier;
    const query = `
        INSERT INTO supplier
        (name, contact, email, address)
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [name, contact, email, address]);
    return result.insertId;
};

export const getAllSuppliers = async () => {
    const [rows] = await db.query("SELECT * FROM supplier");
    return rows;
};

export const getSupplierById = async (id) => {
    const query = "SELECT * FROM supplier WHERE id = ?";
    const [rows] = await db.query(query, [id]);
    return rows.length > 0 ? rows[0] : null;
};




export const deleteSupplierById = async (id) => {
    const query = "DELETE FROM supplier WHERE id = ?";
    const [result] = await db.query(query, [id]);
    return result.affectedRows > 0;
};

export const deleteAllSuppliers = async () => {
    const query = "DELETE FROM supplier";
    const [result] = await db.query(query);
    return result.affectedRows;
};