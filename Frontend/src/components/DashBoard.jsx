export default function Dashboard({ expenses, budget }) {
  console.log("Dashboard received:", { expenses, budget });
  const total = expenses.length ? expenses.reduce((a, b) => a + Number(b.amount), 0) : 0;
  const remaining = budget - total;

  return (
    <div className="dashboard">
      <div className="glass">
        <h4>Budget</h4>
        <h2>₹{budget}</h2>
      </div>

      <div className="glass">
        <h4>Spent</h4>
        <h2>₹{total}</h2>
      </div>

      <div className="glass">
        <h4>Remaining</h4>
        <h2>₹{remaining}</h2>
      </div>
    </div>
  );
}