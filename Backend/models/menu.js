import { db } from "../config/db.js";

export const createMenuItemTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS menu_items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            image VARCHAR(255),
            price DECIMAL(10,2) NOT NULL,
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

export const createItem = async ({ name, image, price }) => {
    const query = `
        INSERT INTO menu_items (name, image, price)
        VALUES (?, ?, ?)
    `;
    const [result] = await db.execute(query, [name, image, price]);
    return result.insertId;
};

