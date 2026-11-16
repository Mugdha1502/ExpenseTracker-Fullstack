const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name?.trim() || !email?.trim() || typeof password !== "string" || password.length < 6) {
      return res.status(400).send("Name, valid email and password (at least 6 characters) are required");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name.trim(), email.trim(), hashedPassword]);
    res.status(201).send("Registered Successfully");
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") return res.status(409).send("Email already registered");
    console.error("Register error:", error);
    res.status(500).send("Registration failed");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).send("Email and password required");
    }
    const [rows] = await db.query("SELECT id, name, email, password FROM users WHERE email = ?", [email.trim()]);
    if (!rows.length || !(await bcrypt.compare(password, rows[0].password))) {
      return res.status(401).send("Invalid email or password");
    }
    const { id, name } = rows[0];
    res.json({ id, name, email: rows[0].email });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Login failed");
  }
};
