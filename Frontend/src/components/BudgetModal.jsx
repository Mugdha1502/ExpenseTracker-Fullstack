import { useState } from "react";
import API from "../api";

export default function BudgetModal({ setBudget, close }) {
  const [amount, setAmount] = useState("");

  const handleSave = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Enter valid amount");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      await API.post("/budget", {
        amount: Number(amount),
        user_id: user.id,
      });

      setBudget(Number(amount));

      alert("Budget saved ");
      close();
    } catch (err) {
      console.log(err);
      alert("Error saving budget");
    }
  };


  return (
    <div className="modal">
      <div className="glass">
        <h3>Set Budget</h3>

        <input
          type="number"
          placeholder="Enter Budget"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={handleSave}>Save</button>
        <button onClick={close}>Cancel</button>
      </div>
    </div>
  );
}
