# Expense Tracker — local setup

This corrected copy targets **local development only** with MySQL Server (managed using MySQL Workbench), Express and Vite. It is **not ready for public deployment** because API endpoints do not use authenticated session/token authorization.

1. In MySQL Workbench, connect to your local MySQL Server and run `Database/local_schema_only.sql` in a new SQL tab (fresh install). The original `Database/Dump20260416.sql` is still included if you explicitly want the archived sample records. Do not import it into an important database: it contains DROP TABLE statements and sample user data.
2. In `Backend`, copy `.env.example` to `.env` and set your real local DB password. Keep `.env` private. If your MySQL Server uses another port/username change those fields too.
3. In PowerShell terminal 1: `cd Backend`, `npm install`, `npm start`. Open `http://localhost:5000/test-db` and check that it says "Database connected".
4. In PowerShell terminal 2: `cd Frontend`, `npm install`, `npm run dev`. Open the URL Vite prints (often `http://localhost:5173` or `http://localhost:5174`).
5. Register a new account and then log in. Test add/edit/delete expenses and budget.

If a former version saved a stale user object in browser localStorage, open the browser console and run `localStorage.removeItem("user")`, then refresh.

Fixes: removed Railway API base URL; mounted backend auth/expenses/budget routers; fixed incorrect auth callback names; converted SQL controllers to consistent mysql2 promise API; fixed stray syntax in CategoryFilter; protected password hash from login response; ensured latest budget is shown; stopped budget change from clearing visible expense data; made React useEffect unconditional.

**Security limitation:** The original project's authentication relies on storing user IDs in localStorage, and the expenses/budget routes trust caller-provided user IDs. This is fine only as an educational local demo. Before deployment, implement verified sessions or JWT middleware on protected routes, scope data to the authenticated user and add stronger validation. Do not expose your MySQL credentials or `.env`.
