if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const { pool, initDb } = require("./db/db");
const showsRoute = require("./routes/shows");
const bookingsRoute = require("./routes/bookings");
const authRoute = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend server is running");
});

app.use("/auth", authRoute);
app.use("/shows", showsRoute);
app.use("/bookings", bookingsRoute);

const PORT = process.env.PORT || 4000;
const expiryMs = 2 * 60 * 1000;

async function expirePending() {
  await pool.query(
    "UPDATE bookings SET status='FAILED' WHERE status='PENDING' AND created_at < NOW() - INTERVAL '2 minutes'"
  );
}

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on http://localhost:" + PORT);
    });
    setInterval(expirePending, expiryMs);
  })
  .catch((err) => {
    console.error("Failed to start server", err);
    process.exit(1);
  });
