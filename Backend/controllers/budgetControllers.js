const db = require("../config/db");

exports.setBudget = async (req, res) => {
  try {
    const { user_id, amount } = req.body || {};
    if (!Number.isInteger(Number(user_id)) || !(Number(amount) > 0)) return res.status(400).send("Invalid budget");
    await db.query("INSERT INTO budgets (user_id, amount) VALUES (?, ?)", [user_id, amount]);
    res.send("Budget Saved");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to save budget");
  }
};

exports.getBudget = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM budgets WHERE user_id = ? ORDER BY id DESC LIMIT 1", [req.params.userId]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to load budget");
  }
};
