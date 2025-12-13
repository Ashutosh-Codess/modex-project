const express = require("express");
const router = express.Router();
const { pool } = require("../db/db");

/**
 * CREATE A SHOW
 * POST /shows
 */
router.post("/", async (req, res) => {
  try {
    const { name, start_time, total_seats } = req.body;

    if (!name || !start_time || !total_seats) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const result = await pool.query(
      `INSERT INTO shows (name, start_time, total_seats)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, start_time, total_seats]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating show:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET ALL SHOWS
 * GET /shows
 */
router.get("/", async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, start_time, total_seats
       FROM shows
       ORDER BY start_time ASC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching shows:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET SINGLE SHOW BY ID
 * GET /shows/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, start_time, total_seats
       FROM shows
       WHERE id = $1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Show not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching show:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * DELETE SHOW
 * DELETE /shows/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      `DELETE FROM shows
       WHERE id = $1
       RETURNING *`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Show not found" });
    }

    res.json({ message: "Show deleted successfully" });
  } catch (err) {
    console.error("Error deleting show:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
