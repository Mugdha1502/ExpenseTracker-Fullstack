require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

const app = express();
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"] }));
app.use(express.json());

app.get("/", (_req, res) => res.send("Expense Tracker API running locally"));
app.get("/test-db", async (_req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS result");
    res.json({ message: "Database connected", rows });
  } catch (error) {
    res.status(500).json({ error: "Database unavailable", detail: error.message });
  }
});
app.use("/auth", authRoutes);
app.use("/expenses", expenseRoutes);
app.use("/budget", budgetRoutes);

const PORT = Number(process.env.PORT || 5000);
(async () => {
  try {
    await db.query("SELECT 1");
    console.log("Connected to local MySQL");
    app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
    process.exitCode = 1;
  }
})();
