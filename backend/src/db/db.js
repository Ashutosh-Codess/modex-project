const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  ssl: {
    rejectUnauthorized: false
  },
  max: 5,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000
});

async function initDb() {
  console.log("Initializing database...");

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    console.log("✓ Users table ready");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS shows (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        start_time TIMESTAMPTZ NOT NULL,
        total_seats INTEGER NOT NULL CHECK (total_seats > 0),
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    console.log("✓ Shows table ready");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        show_id INTEGER NOT NULL REFERENCES shows(id) ON DELETE CASCADE,
        user_name TEXT NOT NULL,
        seats INTEGER[] NOT NULL CHECK (array_length(seats, 1) > 0),
        status TEXT NOT NULL DEFAULT 'PENDING',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    console.log("✓ Bookings table ready");

    await pool.query(`
      ALTER TABLE bookings
      ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE SET NULL
    `);

    console.log("✓ Database initialization complete");
  } catch (err) {
    console.error("Database initialization error:", err);
    throw err;
  }
}

module.exports = { pool, initDb };
