import { db } from "../config/db.js";



// usage_items table
export const createUsageItemsTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS usage_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        stock_item_id INT,
        quantity_used DECIMAL(10,2),

        usage_type ENUM('cooking','wastage') NOT NULL,

        note TEXT,

        date DATE,

        created_by INT,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (stock_item_id) REFERENCES stock_item(id),
        FOREIGN KEY (created_by) REFERENCES users(id)
    )
  `;

    try {
        await db.query(query);
        console.log("Usage items table created");
    } catch (err) {
        console.error("Error creating usage_items table", err);
    }
};






// // usage_records table
// export const createUsageRecordTable = async () => {
//   const query = `
//     CREATE TABLE IF NOT EXISTS usage_records (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       date DATE,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )
//   `;

//   try {
//     await db.query(query);
//     console.log("Usage records table created");
//   } catch (err) {
//     console.error("Error creating usage_records table", err);
//   }
// };

// // usage_items table
// export const createUsageItemsTable = async () => {
//   const query = `
//     CREATE TABLE IF NOT EXISTS usage_items (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       usage_id INT,
//       stock_item_id INT,
//       quantity_used DECIMAL(10,2),
//       FOREIGN KEY (usage_id) REFERENCES usage_records(id) ON DELETE CASCADE
//     )
//   `;

//   try {
//     await db.query(query);
//     console.log("Usage items table created");
//   } catch (err) {
//     console.error("Error creating usage_items table", err);
//   }
// };
