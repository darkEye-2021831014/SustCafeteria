import { db } from "../config/db.js"


export const createInventoryTable = async () => {

    const query = `
        CREATE TABLE IF NOT EXISTS stock_item (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            category VARCHAR(50),
            unit VARCHAR(10) NOT NULL,
            minimum_stock DECIMAL(10,2) DEFAULT 0 CHECK (minimum_stock >= 0),
            current_stock DECIMAL(10,2) DEFAULT 0 CHECK (current_stock >= 0),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;

    try{
        await db.query(query);
        console.log("Stock table created successfully");
    }
    catch(err){
        console.error("Error creating stock table",err);
    }
};



export const addStockItem = async (item) => {

    const {name, category, unit, minimum_stock, current_stock} = item;

    const query = `
        INSERT INTO stock_item
        (name, category, unit, minimum_stock, current_stock)
        VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
        name,
        category,
        unit,
        minimum_stock,
        current_stock
    ]);

    return result;
};



export const getAllStockItems = async () => {

    const query = `
        SELECT *,
        CASE
            WHEN current_stock <= minimum_stock THEN 'Low Stock'
            ELSE 'Available'
        END AS status
        FROM stock_item
    `;

    const [rows] = await db.query(query);

    return rows;

};



export const getLowStockItems = async () => {

    const query = `
        SELECT *,
        CASE
            WHEN current_stock <= minimum_stock THEN 'Low Stock'
            ELSE 'Available'
        END AS status
        FROM stock_item
        WHERE current_stock <= minimum_stock
    `;

    const [rows] = await db.query(query);

    return rows;

};


export const getAvailableStockItems = async () => {

    const query = `
        SELECT *,
        CASE
            WHEN current_stock <= minimum_stock THEN 'Low Stock'
            ELSE 'Available'
        END AS status
        FROM stock_item
        WHERE current_stock > 0
    `;

    const [rows] = await db.query(query);

    return rows;

};



export const updateStock = async (id, quantity) => {

    const query = `
        UPDATE stock_item
        SET current_stock = ?
        WHERE id = ?
    `;

    const [result] = await db.query(query,[quantity,id]);

    return result;

};



export const deleteStockItem = async (id) => {

    const query = `
        DELETE FROM stock_item
        WHERE id = ?
    `;

    const [result] = await db.query(query,[id]);

    return result;

};