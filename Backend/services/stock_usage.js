import { db } from "../config/db.js";

export const createUsageService = async ({
  stock_item_id,
  quantity_used,
  usage_type,
  note,
  created_by,
}) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // 1️⃣check stock
    const [rows] = await connection.query(
      "SELECT current_stock FROM stock_item WHERE id = ?",
      [stock_item_id]
    );

    if (rows.length === 0) {
      throw new Error("Item not found");
    }

    const currentStock = rows[0].quantity;

    if (currentStock < quantity_used) {
      throw new Error("Not enough stock");
    }

    // 2️⃣ insert usage
    await connection.query(
      `INSERT INTO usage_items
      (stock_item_id, quantity_used, usage_type, note, date, created_by)
      VALUES (?, ?, ?, ?, CURDATE(), ?)`,
      [stock_item_id, quantity_used, usage_type, note, created_by]
    );

    // 3️⃣ update stock
    await connection.query(
      `UPDATE stock_item
       SET current_stock = current_stock - ?
       WHERE id = ?`,
      [quantity_used, stock_item_id]
    );

    await connection.commit();

    return { message: "Usage saved successfully" };

  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};