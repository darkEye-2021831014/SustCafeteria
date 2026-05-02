import { db } from "../config/db.js";

//  CREATE TABLE
export const createAttendanceTable = async () => {
  try {
    // create table
    await db.query(`
      CREATE TABLE IF NOT EXISTS attendance (

        id INT AUTO_INCREMENT PRIMARY KEY,

        user_id INT NOT NULL,

        status VARCHAR(20),

        time TIME,

        date DATE,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP,

        UNIQUE KEY unique_user_date (user_id, date),

        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
      )
    `);
    await db.query(`
      ALTER TABLE attendance 
      ADD UNIQUE KEY unique_user_date (user_id, date)
    `).catch(() => {
      console.log("Unique key already exists (skip)");
    });

  } catch (err) {
    console.log("Attendance setup error:", err);
  }
};

//  ADD ATTENDANCE (ONLY ONCE PER DAY)
export const addAttendance = async (data) => {
  let { user_id, status, time, date } = data;

  if (!date) {
    date = new Date().toISOString().split("T")[0];
  }

  const [existing] = await db.query(
    `SELECT id FROM attendance WHERE user_id = ? AND date = ?`,
    [user_id, date]
  );

  if (existing.length > 0) {
    throw new Error("Attendance already marked today");
  }

  const [result] = await db.query(
    `INSERT INTO attendance (user_id, status, time, date)
     VALUES (?, ?, ?, ?)`,
    [user_id, status, time, date]
  );

  return result.insertId;
};

// get all attendance for a date, with optional status filter
export const getAllAttendance = async (date, status) => {
  let query = `
    SELECT 
      users.id AS user_id,
      users.name,
      users.role,
      users.image,
      a.status,
      a.time,
      a.date
    FROM users
    LEFT JOIN attendance a
      ON users.id = a.user_id
      AND a.date = ?
  `;

  let params = [date];

  if (status) {
    query += ` WHERE a.status = ?`;
    params.push(status);
  }

  query += ` ORDER BY users.name`;

  const [rows] = await db.query(query, params);

  return rows;
};

export const getAttendanceReport = async (startDate, endDate) => {
  let query = `
    SELECT
      users.id,
      users.name,
      users.role AS position,

      SUM(CASE WHEN LOWER(TRIM(a.status))='present' THEN 1 ELSE 0 END) AS present,
      SUM(CASE WHEN LOWER(TRIM(a.status))='absent' THEN 1 ELSE 0 END) AS absent,
      SUM(CASE WHEN LOWER(TRIM(a.status))='late' THEN 1 ELSE 0 END) AS late

    FROM users
    LEFT JOIN attendance a
      ON users.id = a.user_id
  `;

  let params = [];
  if (startDate && endDate) {
    query += ` AND a.date BETWEEN ? AND ?`;
    params.push(startDate, endDate);
  }

  query += ` GROUP BY users.id, users.name, users.role`;

  const [rows] = await db.query(query, params);

  return rows;
};