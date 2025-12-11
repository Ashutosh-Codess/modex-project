const express = require("express");
const router = express.Router();
const { pool } = require("../db/db");
const auth = require("../middleware/auth");

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM bookings ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", auth, async (req, res) => {
  const client = await pool.connect();
  try {
    const { show_id, seats } = req.body;
    if (!show_id || !Array.isArray(seats) || seats.length === 0) {
      client.release();
      return res.status(400).json({ error: "Invalid payload" });
    }
    const uniqueSeats = Array.from(new Set(seats.map((s) => Number(s))));
    await client.query("BEGIN");
    const show = await client.query(
      "SELECT id, total_seats FROM shows WHERE id=$1 FOR UPDATE",
      [show_id]
    );
    if (show.rows.length === 0) {
      await client.query("ROLLBACK");
      client.release();
      return res.status(404).json({ error: "Show not found" });
    }
    const totalSeats = show.rows[0].total_seats;
    const outOfRange = uniqueSeats.some(
      (s) => Number.isNaN(s) || s < 1 || s > totalSeats
    );
    if (outOfRange) {
      await client.query("ROLLBACK");
      client.release();
      return res.status(400).json({ error: "Seat selection invalid" });
    }
    const bookedRes = await client.query(
      `SELECT COALESCE(array_agg(DISTINCT seat), '{}') AS seats
       FROM (SELECT unnest(seats) AS seat FROM bookings WHERE show_id=$1 AND status='CONFIRMED') t FOR SHARE`,
      [show_id]
    );
    const alreadyBooked = bookedRes.rows[0].seats || [];
    const conflict = uniqueSeats.some((s) => alreadyBooked.includes(s));
    if (conflict) {
      await client.query("ROLLBACK");
      client.release();
      return res
        .status(409)
        .json({ error: "One or more seats already booked" });
    }
    const booking = await client.query(
      `INSERT INTO bookings (user_id, user_name, show_id, seats, status)
       VALUES ($1, $2, $3, $4, 'CONFIRMED') RETURNING *`,
      [req.user.id, req.user.name, show_id, uniqueSeats]
    );
    await client.query("COMMIT");
    res.json(booking.rows[0]);
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

module.exports = router;
