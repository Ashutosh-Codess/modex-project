const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../db/db");
const auth = require("../middleware/auth");

const router = express.Router();
const secret = process.env.JWT_SECRET || "dev-secret";

function buildToken(user) {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    secret,
    { expiresIn: "7d" }
  );
}

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const client = await pool.connect();
  try {
    const existing = await client.query("SELECT id FROM users WHERE email=$1", [
      email,
    ]);
    if (existing.rows.length) {
      return res.status(409).json({ error: "Email already registered" });
    }
    const hash = await bcrypt.hash(password, 10);
    const result = await client.query(
      "INSERT INTO users (name, email, password_hash) VALUES ($1,$2,$3) RETURNING id,name,email",
      [name, email, hash]
    );
    const user = result.rows[0];
    const token = buildToken(user);
    return res.json({ token, user });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  } finally {
    client.release();
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }
  try {
    const userRes = await pool.query(
      "SELECT id,name,email,password_hash FROM users WHERE email=$1",
      [email]
    );
    if (!userRes.rows.length) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const user = userRes.rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = buildToken(user);
    return res.json({ token, user: { id: user.id, name: user.name, email } });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/me", auth, async (req, res) => {
  return res.json({ user: req.user });
});

module.exports = router;


