import { db } from "../config/db.js";

export const getSalesReport = async (startDate, endDate) => {

    const query = `
        SELECT 
            m.name AS product,
            SUM(oi.quantity) AS total_quantity,
            AVG(oi.unit_price) AS unit_price,
            SUM(oi.total_cost) AS total_sales
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.id
        JOIN menu_items m ON oi.menu_item_id = m.id
        WHERE DATE(o.order_time) BETWEEN ? AND ?
        GROUP BY oi.menu_item_id
        ORDER BY total_quantity DESC
    `;

    const [rows] = await db.execute(query, [startDate, endDate]);

    return rows;
};


export const getTotalSales = async (startDate, endDate) => {

    const query = `
        SELECT SUM(total) AS total_sales
        FROM orders
        WHERE DATE(order_time) BETWEEN ? AND ?
    `;

    const [rows] = await db.execute(query, [startDate, endDate]);

    return rows[0];
};