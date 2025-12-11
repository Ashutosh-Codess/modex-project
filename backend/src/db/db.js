const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
});

// Retry logic for Render free Postgres
async function connectWithRetry(retries = 10, delay = 3000) {
  while (retries > 0) {
    try {
      await pool.connect();
      console.log("✓ Connected to Render PostgreSQL");
      return;
    } catch (err) {
      console.error(
        `DB connection failed (${retries} retries left). Retrying in ${delay/1000}s...`,
        err.message
      );
      retries--;
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error("❌ Could not connect to PostgreSQL after multiple retries");
}

async function initDb() {
  try {
    console.log("Initializing database...");

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

// Start connection
connectWithRetry();

module.exports = { pool, initDb };
