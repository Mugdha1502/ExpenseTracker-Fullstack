import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ChartsSection({ expenses }) {
  //  convert data to category wise total
  const dataMap = {};

  expenses.forEach((e) => {
    if (!dataMap[e.category]) {
      dataMap[e.category] = 0;
    }
    dataMap[e.category] += Number(e.amount);
  });

  const chartData = Object.keys(dataMap).map((key) => ({
    category: key,
    amount: dataMap[key],
  }));

  return (
    <div className="glass">
      <h3>Expenses Overview</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <defs>
            {/*  Gradient */}
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF4D6D" />
              <stop offset="100%" stopColor="#FFAFBD" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff22" />
          <XAxis dataKey="category" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />

          <Bar dataKey="amount" fill="url(#colorGradient)" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}