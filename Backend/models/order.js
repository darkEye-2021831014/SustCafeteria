import { db } from "../config/db.js";

export const createOrderTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            subtotal DECIMAL(10,2) NOT NULL,
            discount DECIMAL(10,2) DEFAULT 0,
            total DECIMAL(10,2) NOT NULL
        )
    `;
    try {
        await db.execute(query);
        console.log("Orders table created successfully");
    } catch (err) {
        console.error("Error creating orders table", err);
    }
};

export const createOrder = async ({ subtotal, discount, total }) => {
    const query = `
        INSERT INTO orders (subtotal, discount, total)
        VALUES (?, ?, ?)
    `;

    const [result] = await db.execute(query, [subtotal, discount, total]);

    return result.insertId;
};

export const getAllOrders = async () => {
    const query = `
        SELECT * FROM orders
        ORDER BY order_time DESC
    `;

    const [rows] = await db.execute(query);
    return rows;
};



export const getTodayOrders = async () => {

    const query = `
        SELECT *
        FROM orders
        WHERE DATE(order_time) = CURDATE()
        ORDER BY order_time DESC
    `;

    const [rows] = await db.execute(query);

    return rows;
};