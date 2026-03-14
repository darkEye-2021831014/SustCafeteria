import mysql from "mysql2/promise";
import { createUserTable } from "../models/user.js";
import { createInventoryTable } from "../models/inventory.js";
import { createSupplierTable } from "../models/supplier.js";
import { createItemSupplierTable } from "../models/item_supplier.js";
import { createPurchaseOrderTable } from "../models/purchase_order.js";

import { createStaffTable } from "../models/staff.js";
export const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
     ssl: {
        rejectUnauthorized: true
    }
});

export const setUpDB = async () => {
    try {
        const connection = await db.getConnection();
        console.log("MySQL connected successfully");
        connection.release();
    } catch (error) {
        console.error("MySQL connection failed:", error.message);
    }

    // Database Schema
    createUserTable();
    await createInventoryTable();
    await createSupplierTable();
    await createItemSupplierTable();
    await createPurchaseOrderTable();
    await createStaffTable();
};

