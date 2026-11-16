import { useEffect, useState } from "react";
import API from "./api";

import ExpenseTable from "./components/ExpenseTable";
import ExpenseModal from "./components/ExpenseModal";
import BudgetModal from "./components/BudgetModal";
import Auth from "./components/Auth";
import ChartsSection from "./components/ChartsSection";
import CategoryFilter from "./components/CategoryFilter";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [budget, setBudget] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  
  let user = null;
  try {
    const userData = localStorage.getItem("user");
    user =
      userData && userData !== "undefined"
        ? JSON.parse(userData)
        : null;
  } catch (err) {
    console.log("Invalid user data");
    user = null;
  }

  //  FETCH EXPENSES
  const fetchExpenses = async () => {
    try {
      const res = await API.get(`/expenses?user_id=${user.id}`);
      setExpenses(res.data);
    } catch (err) {
      console.log("Expense fetch error:", err);
    }
  };

  //  FETCH BUDGET
  const fetchBudget = async () => {
    try {
      const res = await API.get(`/budget/${user.id}`);

      if (res.data.length > 0) {
        setBudget(res.data[0].amount);
      } else {
        setBudget(0);
      }
    } catch (err) {
      console.log("Budget fetch error:", err);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchExpenses();
      fetchBudget();
    }
  }, [user?.id]);

  if (!user) {
    return <Auth />;
  }

  //  CALCULATIONS
  const totalSpent = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );
  const remaining = budget - totalSpent;

  // 🔍 FILTER LOGIC (CATEGORY + SEARCH)
  const filteredExpenses = expenses
    .filter(
      (e) => category === "ALL" || e.category === category
    )
    .filter((e) =>
      e.note?.toLowerCase().includes(search.toLowerCase())
    );

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="container">
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Hello {user.name} 👋</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <h1>Expense Tracker</h1>

      {/*  SUMMARY CARDS */}
      <div className="dashboard">
        <div className="glass">
          <h3>Budget</h3>
          <h2>₹{budget}</h2>
        </div>

        <div className="glass">
          <h3>Spent</h3>
          <h2>₹{totalSpent}</h2>
        </div>

        <div className="glass">
          <h3>Remaining</h3>
          <h2>₹{remaining}</h2>
        </div>
      </div>

      {/*  ACTION BUTTONS ) */}
      <div className="actions">
        <button onClick={() => setShowModal(true)}>
          + Add Expense
        </button>
        <button onClick={() => setShowBudgetModal(true)}>
          Set Budget
        </button>
      </div>

      {/*  SEARCH BAR */}
      <input
        type="text"
        placeholder="🔍 Search expenses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {/*   CATEGORY FILTER */}
      <CategoryFilter
        setCategory={setCategory}
        activeCategory={category}
      />

      {/*  CHART ONLY IF EXPENSE EXISTS */}
      {expenses.length > 0 && (
        <ChartsSection expenses={expenses} />
      )}

     
      {filteredExpenses.length === 0 ? (
        <p className="no-expense">No expenses here</p>
      ) : (
        <ExpenseTable
          expenses={filteredExpenses}
          refresh={fetchExpenses}
        />
      )}

      {/* MODALS */}
      {showModal && (
        <ExpenseModal
          close={() => setShowModal(false)}
          refresh={fetchExpenses}
        />
      )}

      {showBudgetModal && (
        <BudgetModal
          setBudget={setBudget}
          close={() => setShowBudgetModal(false)}
        />
      )}
    </div>
  );
}