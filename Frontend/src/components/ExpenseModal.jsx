import { useState } from "react";
import API from "../api";

export default function ExpenseModal({ data, close, refresh }) {
  const [form, setForm] = useState(
    data
      ? {
        ...data,
        date: data.date?.split("T")[0],
      }
      : {
        amount: "",
        category: "Food & Drinks",
        date: "",
        note: "",
      }
  );

  const handleSubmit = async () => {
    try {
      const { amount, category, date } = form;

      if (!amount || !category || !date) {
        alert("All fields are required");
        return;
      }


      if (Number(amount) <= 0) {
        alert("Amount must be greater than 0");
        return;
      }

      const formattedDate = date.split("T")[0];

      const user = JSON.parse(localStorage.getItem("user"));

      const payload = {
        amount: Number(amount),
        category,
        date: formattedDate,
        note: form.note || "",
        user_id: user.id,
      };

      if (data) {
        await API.put(`/expenses/${data.id}`, payload);
      } else {
        await API.post("/expenses", payload);
      }

      alert("Saved Successfully ");
      refresh();
      close();
    } catch (err) {
      alert("Error saving expense ");
    }
  };
  return (
    <div className="modal">
      <div className="glass">
        <h3>{data ? "Edit Expense" : "Add Expense"}</h3>

        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
        />

        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        >
          <option>Food & Drinks</option>
          <option>Groceries</option>
          <option>Shopping</option>
          <option>Travel</option>
          <option>Health</option>
          <option>Other</option>
        </select>

        <input
          type="date"
          value={form.date ? form.date.split("T")[0] : ""}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <input
          placeholder="Note"
          value={form.note}
          onChange={(e) =>
            setForm({ ...form, note: e.target.value })
          }
        />

        <button onClick={handleSubmit}>Save</button>
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
}