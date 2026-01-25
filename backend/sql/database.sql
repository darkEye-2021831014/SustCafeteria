CREATE DATABASE sust_cafeteria;
USE sust_cafeteria;


CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  staff_id VARCHAR(10),
  email VARCHAR(50) UNIQUE,
  password VARCHAR(255),
  role VARCHAR(20),
  is_active BOOLEAN DEFAULT true,
  last_login DATETIME,
  FOREIGN KEY (staff_id) REFERENCES staff(id)
);



