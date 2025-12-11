const express = require("express");
const router = express.Router();
const { pool } = require("../db/db");

router.post("/", async (req, res) => {
  try {
    const { name, start_time, total_seats } = req.body;
    if (!name || !start_time || !total_seats) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const result = await pool.query(
      "INSERT INTO shows (name, start_time, total_seats) VALUES ($1, $2, $3) RETURNING *",
      [name, start_time, total_seats]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT s.*,
        COALESCE(s.total_seats - (
          SELECT COALESCE(SUM(array_length(b.seats, 1)), 0)
          FROM bookings b
          WHERE b.show_id = s.id AND b.status = 'CONFIRMED'
        ), s.total_seats) AS available_seats
       FROM shows s
       ORDER BY s.start_time`
    );
    res.json(result.rows || []);
  } catch (err) {
    console.error("Error fetching shows:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const show = await pool.query("SELECT * FROM shows WHERE id=$1", [
      req.params.id,
    ]);
    if (show.rows.length === 0) {
      return res.status(404).json({ error: "Show not found" });
    }
    const booked = await pool.query(
      `SELECT COALESCE(array_agg(DISTINCT seat), '{}') AS seats
       FROM (SELECT unnest(seats) AS seat FROM bookings WHERE show_id=$1 AND status='CONFIRMED') t`,
      [req.params.id]
    );
    const bookedSeats = booked.rows[0].seats || [];
    const availableSeats =
      show.rows[0].total_seats - (bookedSeats ? bookedSeats.length : 0);
    res.json({
      ...show.rows[0],
      booked_seats: bookedSeats,
      available_seats: availableSeats,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM shows WHERE id=$1 RETURNING *", [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Show not found" });
    }
    res.json({ message: "Show deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
