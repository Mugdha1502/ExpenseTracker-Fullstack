const db = require("../config/db");

const fail = (res, error) => {
  console.error("Expense database error:", error);
  res.status(500).json({ message: "Expense operation failed" });
};

exports.getExpenses = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC", [req.query.user_id]);
    res.json(rows);
  } catch (error) { fail(res, error); }
};

exports.addExpense = async (req, res) => {
  try {
    const { amount, category, date, note, user_id } = req.body || {};
    if (!(Number(amount) > 0) || !category || !date || !user_id) return res.status(400).json({ message: "Missing or invalid expense fields" });
    await db.query("INSERT INTO expenses (amount, category, date, note, user_id) VALUES (?, ?, ?, ?, ?)",
      [amount, category, date, note || "", user_id]);
    res.status(201).json({ message: "Expense added" });
  } catch (error) { fail(res, error); }
};

exports.getSingleExpense = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM expenses WHERE id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Expense not found" });
    res.json(rows[0]);
  } catch (error) { fail(res, error); }
};

exports.updateExpense = async (req, res) => {
  try {
    const { amount, category, date, note } = req.body || {};
    if (!(Number(amount) > 0) || !category || !date) return res.status(400).json({ message: "Missing or invalid expense fields" });
    const [result] = await db.query("UPDATE expenses SET amount = ?, category = ?, date = ?, note = ? WHERE id = ?",
      [amount, category, date, note || "", req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Updated successfully" });
  } catch (error) { fail(res, error); }
};

exports.deleteExpense = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM expenses WHERE id = ?", [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) { fail(res, error); }
};
