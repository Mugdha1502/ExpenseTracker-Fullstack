export default function SummaryCards({ budget, expense, remaining }) {
  return (
    <div className="summary">
      <div className="card">
        <p>Total Budget</p>
        <h3>₹ {budget}</h3>
      </div>

      <div className="card">
        <p>Total Expense</p>
        <h3>₹ {expense}</h3>
      </div>

      <div className="card">
        <p>Remaining</p>
        <h3>₹ {remaining}</h3>
      </div>
    </div>
  );
}
