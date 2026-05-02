import { db } from "../config/db.js";

export const createOrderItemTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS order_items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            order_id INT NOT NULL,
            menu_item_id INT NOT NULL,
            quantity INT NOT NULL,
            unit_price DECIMAL(10,2) NOT NULL,
            total_cost DECIMAL(10,2) NOT NULL,

            FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
            FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
        )
    `;
    try {
        await db.execute(query);
        console.log("Order Items table created successfully");
    } catch (err) {
        console.error("Error creating order items table", err);
    }
};

export const createOrderItem = async (
    order_id,
    menu_item_id,
    quantity,
    unit_price,
    total_cost
) => {
    const query = `
        INSERT INTO order_items 
        (order_id, menu_item_id, quantity, unit_price, total_cost)
        VALUES (?, ?, ?, ?, ?)
    `;

    await db.execute(query, [
        order_id,
        menu_item_id,
        quantity,
        unit_price,
        total_cost,
    ]);

    return true;
};

export const getAllOrderItems = async () => {
    const query = `
        SELECT * FROM order_items
    `;

    const [rows] = await db.execute(query);
    return rows;
};