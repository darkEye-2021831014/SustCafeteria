import { db } from "../config/db.js";

export const createItemSupplierTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS item_supplier (
            supplier_id INT,
            stock_item_id INT,
            price_per_unit DECIMAL(10,2),
            notes TEXT,
            PRIMARY KEY (supplier_id, stock_item_id),
            FOREIGN KEY (supplier_id) REFERENCES supplier(id) ON DELETE CASCADE,
            FOREIGN KEY (stock_item_id) REFERENCES stock_item(id) ON DELETE CASCADE
        )
    `;
    try {
        await db.query(query);
        console.log("Item supplier table created successfully");
    } catch (err) {
        console.error("Error creating item supplier table", err);
    }
};


export const addItemSupplier = async (itemSupplier) => {
    const { supplier_id, stock_item_id, price_per_unit, notes } = itemSupplier;
    const query = `
        INSERT INTO item_supplier
        (supplier_id, stock_item_id, price_per_unit, notes)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        price_per_unit = VALUES(price_per_unit),
        notes = VALUES(notes)
    `;
    const [result] = await db.query(query, [supplier_id, stock_item_id, price_per_unit, notes]);
    return result;
};


export const getItemSuppliersBySupplier = async (supplier_id) => {
    const query = `
        SELECT is.*, si.name as item_name, si.category, si.unit
        FROM item_supplier is
        JOIN stock_item si ON is.stock_item_id = si.id
        WHERE is.supplier_id = ?
    `;
    const [rows] = await db.query(query, [supplier_id]);
    return rows;
};

export const getSuppliersByItem = async (stock_item_id) => {
    const query = `
        SELECT is.*, s.name as supplier_name, s.contact, s.email, s.address
        FROM item_supplier is
        JOIN supplier s ON is.supplier_id = s.id
        WHERE is.stock_item_id = ?
    `;
    const [rows] = await db.query(query, [stock_item_id]);
    return rows;
};


export const deleteItemSupplier = async (supplier_id, stock_item_id) => {
    const query = "DELETE FROM item_supplier WHERE supplier_id = ? AND stock_item_id = ?";
    const [result] = await db.query(query, [supplier_id, stock_item_id]);
    return result.affectedRows > 0;
};