const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5002;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database");
});

// API Routes
const authRoutes = require("./routes/auth");
const planRoutes = require("./routes/plans");

app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);

// Serve index.html as the entry point
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Handle 404 - Keep this as the last middleware
app.use((req, res, next) => {
  res.status(404).send("404: Not Found");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
