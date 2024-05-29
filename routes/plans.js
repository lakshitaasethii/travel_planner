const express = require("express");
const router = express.Router();
const db = require("../db");

// Create a plan
router.post("/", (req, res) => {
  const { title, description, date } = req.body;
  const userId = req.user.id; // Assuming user is authenticated

  const sql =
    "INSERT INTO plans (title, description, date, user_id) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, description, date, userId], (err, result) => {
    if (err) {
      console.error("Error creating plan:", err);
      res.status(500).json({ error: "Failed to create plan" });
      return;
    }
    res
      .status(201)
      .json({ message: "Plan created successfully", planId: result.insertId });
  });
});

// Get all plans
router.get("/", (req, res) => {
  const userId = req.user.id; // Assuming user is authenticated

  const sql = "SELECT * FROM plans WHERE user_id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching plans:", err);
      res.status(500).json({ error: "Failed to fetch plans" });
      return;
    }
    res.status(200).json(results);
  });
});

module.exports = router;
