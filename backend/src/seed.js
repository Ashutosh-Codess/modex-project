require("dotenv").config();
const { pool } = require("./db/db");

async function seedShows() {
  try {
    console.log("Seeding sample shows...");

    // Clear existing shows to add fresh ones
    await pool.query("DELETE FROM shows");
    console.log("Cleared existing shows");

    const shows = [
      {
        name: "The Dark Knight",
        start_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
        total_seats: 100,
      },
      {
        name: "Inception",
        start_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
        total_seats: 120,
      },
      {
        name: "Interstellar",
        start_time: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
        total_seats: 150,
      },
      {
        name: "The Matrix",
        start_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
        total_seats: 80,
      },
      {
        name: "Avatar",
        start_time: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days from now
        total_seats: 200,
      },
      {
        name: "Avengers: Endgame",
        start_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        total_seats: 180,
      },
    ];

    for (const show of shows) {
      await pool.query(
        "INSERT INTO shows (name, start_time, total_seats) VALUES ($1, $2, $3)",
        [show.name, show.start_time, show.total_seats]
      );
      console.log(`✓ Added: ${show.name}`);
    }

    console.log("✅ Sample shows seeded successfully!");
  } catch (err) {
    console.error("Error seeding shows:", err);
    throw err;
  }
}

seedShows()
  .then(() => {
    console.log("Seed completed");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });

