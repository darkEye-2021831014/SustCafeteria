import { db } from "../config/db.js";

export const createStaffTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS staff (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      role VARCHAR(50) NOT NULL,
      salary INT NOT NULL,
      phone VARCHAR(20),
      email VARCHAR(100) NOT NULL UNIQUE,
      address VARCHAR(255),
      join_date DATE,
      image VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  try {
    await db.execute(query);
    console.log("Staff table ready");
  } catch (error) {
    console.error("Staff table error:", error.message);
  }
};

export const addStaff = async (data) => {
  const { name, role, salary, phone, email, address, join_date, image } = data;

  const query = `
    INSERT INTO staff (name, role, salary, phone, email, address, join_date, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.execute(query, [
    name,
    role,
    salary,
    phone,
    email,
    address,
    join_date,
    image,
  ]);

  return result.insertId;
};

export const getStaffById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM staff WHERE id = ?", [id]);

  return rows[0];
};

export const getAllStaff = async () => {
  const [rows] = await db.execute("SELECT * FROM staff");
  return rows;
};

export const deleteStaff = async (id) => {
  const [result] = await db.execute("DELETE FROM staff WHERE id = ?", [id]);

  return result;
};

export const deleteAllStaff = async () => {
  const [result] = await db.execute("DELETE FROM staff");

  return result;
};
