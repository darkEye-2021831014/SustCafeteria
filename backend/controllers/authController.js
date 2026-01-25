const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const sql = `
    SELECT id, staff_id, email, password, role
    FROM users
    WHERE email = ? AND is_active = true
  `;

  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result[0];

    // password check
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // JWT create
    const token = generateToken(user);


    res.json({
      message: "Login successful ✅",
      token,
      user: {
        staff_id: user.staff_id,
        email: user.email,
        role: user.role,
      },
    });
  });
};
