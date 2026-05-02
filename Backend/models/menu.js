import { db } from "../config/db.js";

export const createMenuItemTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS menu_items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            image VARCHAR(255),
            price DECIMAL(10,2) NOT NULL,
            category VARCHAR(100) NOT NULL,
            is_deleted BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;

    try {
        await db.execute(query);
        console.log("Menu Items table created successfully");
    } catch (err) {
        console.error("Error creating menu items table", err);
    }
};

export const createItem = async ({ name, image, price, category }) => {
    const query = `
        INSERT INTO menu_items (name, image, price, category)
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [name, image, price, category]);
    return result.insertId;
};

export const getAllItems = async () => {
    const query = `
        SELECT id, name, image, price, category
        FROM menu_items
        WHERE is_deleted = FALSE
        ORDER BY created_at DESC
    `;
    const [rows] = await db.execute(query);
    return rows;
};
export const updateItem = async ({ fields, id }) => {
    const updateFields = [];
    const values = [];

    Object.keys(fields).forEach((key) => {
        if (fields[key] !== undefined && fields[key] !== null) {
            updateFields.push(`${key} = ?`);
            values.push(fields[key]);
        }
    });

    if (updateFields.length === 0) {
        throw new Error("No fields to update");
    }

    const query = `
        UPDATE menu_items
        SET ${updateFields.join(", ")}
        WHERE id = ?
    `;
    values.push(id);

    const [result] = await db.execute(query, values);

    return result.affectedRows > 0;
};


export const deleteItem = async (id) => {
    const query = `
        UPDATE menu_items
        SET is_deleted = TRUE
        WHERE id = ?
    `;

    const [result] = await db.execute(query, [id]);

    return result.affectedRows > 0;
};