import { db } from "../config/db.js";

export const createAttendanceTable = async () => {

    const query = `
        CREATE TABLE IF NOT EXISTS attendance (

            id INT AUTO_INCREMENT PRIMARY KEY,

            user_id INT NOT NULL,

            status VARCHAR(20),

            time TIME,

            date DATE,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
            ON UPDATE CURRENT_TIMESTAMP,

            FOREIGN KEY (user_id) REFERENCES users(id)
            ON DELETE CASCADE
        )
    `;

    try {

        await db.query(query);

        console.log("Attendance table created successfully");

    } catch (err) {

        console.log("Attendance table error:", err);

    }
};



export const addAttendance = async (data) => {

    let { user_id, status, time, date } = data;
    if (!date) {
        date = new Date().toISOString().split("T")[0];
    }

    const query = `
        INSERT INTO attendance
        (user_id, status, time, date)
        VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.query(
        query,
        [user_id, status, time, date]
    );

    return result.insertId;
};


export const getAllAttendance = async (date, status) => {

    let query = `
        SELECT 

            users.id,
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
