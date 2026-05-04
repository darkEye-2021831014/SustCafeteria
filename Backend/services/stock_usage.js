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

    //check stock
    const [rows] = await connection.query(
      "SELECT current_stock FROM stock_item WHERE id = ?",
      [stock_item_id]
    );

    if (rows.length === 0) {
      throw new Error("Item not found");
    }

    const qty = Number(quantity_used);
    if (!Number.isFinite(qty) || qty <= 0) {
      throw new Error("quantity_used must be a positive number");
    }

    const currentStock = Number(rows[0].current_stock);

    if (currentStock < qty) {
      throw new Error("Not enough stock");
    }

    //insert usage
    await connection.query(
      `INSERT INTO usage_items
      (stock_item_id, quantity_used, usage_type, note, date, created_by)
      VALUES (?, ?, ?, ?, CURDATE(), ?)`,
      [stock_item_id, qty, usage_type, note, created_by]
    );

    //update stock
    await connection.query(
      `UPDATE stock_item
       SET current_stock = current_stock - ?
       WHERE id = ?`,
      [qty, stock_item_id]
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




export const getUsageHistory = async ({
  startDate,
  endDate,
}) => {
  let query = `
    SELECT 
      u.id,
      s.name AS item_name,
      s.unit,
      s.current_stock,
      s.minimum_stock,
      u.quantity_used,
      u.usage_type,
      u.note,
      u.date,
      u.created_at,
      users.name AS created_by
    FROM usage_items u
    JOIN stock_item s ON u.stock_item_id = s.id
    JOIN users ON u.created_by = users.id
    WHERE 1=1
  `;

  const params = [];

  if (startDate && endDate) {
    query += " AND u.date BETWEEN ? AND ?";
    params.push(startDate, endDate);
  }

  query += " ORDER BY u.date DESC";

  const [rows] = await db.query(query, params);

  return rows;
};