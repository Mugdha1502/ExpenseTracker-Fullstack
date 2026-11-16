import { useState } from "react";
import API from "../api";
import ExpenseModal from "./ExpenseModal";

export default function ExpenseTable({ expenses = [], refresh }) {
  const [edit, setEdit] = useState(null);

  // DELETE EXPENSE
  const deleteExpense = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      refresh();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete expense");
    }
  };

  // SAFE CATEGORY CLASS GENERATOR
  const getCategoryClass = (category) => {
    if (!category) return "nocategory";
    return category.toLowerCase().replace(" & ", "").replace(/\s+/g, "");
  };

  return (
    <div className="glass">
      <h3>All Expenses</h3>

      {/* EMPTY STATE */}
      {expenses.length === 0 ? (
        <p className="no-expense">No expenses here</p>
      ) : (
        <div>
          {expenses.map((e) => {
            // SAFE FALLBACKS
            const amount = Number(e.amount || 0).toLocaleString();
            const date = e.date ? new Date(e.date).toLocaleDateString() : "N/A";
            const category = e.category || "No Category";

            return (
              <div className="expense-row" key={e.id}>
                <div className="expense-left">
                  <strong>₹{e.amount}</strong>
                  <small>{new Date(e.date).toLocaleDateString()}</small>
                </div>

                <span className={`badge ${(e.category || "").toLowerCase().replace(" & ", "")}`}>
                  {e.category}
                </span>

                <div className="expense-right">
                  <button onClick={() => setEdit(e)}>Edit</button>
                  <button onClick={() => deleteExpense(e.id)}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* EDIT MODAL */}
      {edit && (
        <ExpenseModal
          data={edit}
          close={() => setEdit(null)}
          refresh={refresh}
        />
      )}
    </div>
  );
}