import { db } from "../config/db.js";

export const createPurchaseOrderTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS purchase_order (
            id INT AUTO_INCREMENT PRIMARY KEY,
            stock_item_id INT,
            supplier_id INT,
            order_quantity INT,
            expected_delivery DATE,
            status ENUM('PENDING','DELIVERED') DEFAULT 'PENDING',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (stock_item_id) REFERENCES stock_item(id),
            FOREIGN KEY (supplier_id) REFERENCES supplier(id)
        )
    `;
    try {
        await db.query(query);
        console.log("Purchase order table created successfully");
    } catch (err) {
        console.error("Error creating purchase order table", err);
    }
};

export const addPurchaseOrder = async (order) => {
    const { stock_item_id, supplier_id, order_quantity, expected_delivery } = order;
    const query = `
        INSERT INTO purchase_order
        (stock_item_id, supplier_id, order_quantity, expected_delivery)
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [stock_item_id, supplier_id, order_quantity, expected_delivery]);
    return result.insertId;
};


export const getAllPurchaseOrders = async () => {
    const query = `
        SELECT po.*, si.name as item_name, si.unit, s.name as supplier_name
        FROM purchase_order po
        JOIN stock_item si ON po.stock_item_id = si.id
        JOIN supplier s ON po.supplier_id = s.id
        ORDER BY po.created_at DESC
    `;
    const [rows] = await db.query(query);
    return rows;
};


export const getPendingPurchaseOrders = async () => {
    const query = `
        SELECT po.*, si.name as item_name, si.unit, s.name as supplier_name
        FROM purchase_order po
        JOIN stock_item si ON po.stock_item_id = si.id
        JOIN supplier s ON po.supplier_id = s.id
        WHERE po.status = 'PENDING'
        ORDER BY po.expected_delivery ASC
    `;
    const [rows] = await db.query(query);
    return rows;
};

export const getPurchaseOrderById = async (id) => {
    const query = `
        SELECT po.*, si.name as item_name, si.unit, s.name as supplier_name
        FROM purchase_order po
        JOIN stock_item si ON po.stock_item_id = si.id
        JOIN supplier s ON po.supplier_id = s.id
        WHERE po.id = ?
    `;
    const [rows] = await db.query(query, [id]);
    return rows.length > 0 ? rows[0] : null;
};

export const updatePurchaseOrderStatus = async (id, status) => {
    const query = "UPDATE purchase_order SET status = ? WHERE id = ?";
    const [result] = await db.query(query, [status, id]);
    return result.affectedRows > 0;
};


export const getLowStockItems = async () => {
    const query = `
        SELECT si.*, GROUP_CONCAT(s.name) as suppliers
        FROM stock_item si
        LEFT JOIN item_supplier iss ON si.id = iss.stock_item_id
        LEFT JOIN supplier s ON iss.supplier_id = s.id
        WHERE si.current_stock <= si.minimum_stock
        GROUP BY si.id
    `;
    const [rows] = await db.query(query);
    return rows;
};