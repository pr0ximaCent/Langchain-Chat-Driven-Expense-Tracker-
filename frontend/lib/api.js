// frontend/lib/api.js

const BASE_URL = "http://localhost:8000";

// GET: all saved expenses
export async function fetchExpenses() {
  const res = await fetch("http://localhost:8000/expenses");
  return await res.json();
}

// POST: new expense via natural language input
export async function postExpense(entry) {
  const res = await fetch("http://localhost:8000/parse_expense", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entry }),
  });
  return await res.json();
}

// GET: semantic search for matching expenses
export async function queryExpenses(query) {
  const res = await fetch(`http://localhost:8000/query_expenses?query=${encodeURIComponent(query)}`);
  return await res.json();
}

// GET: pie chart data — spending by category
export async function fetchCategoryAnalytics() {
  const res = await fetch("http://localhost:8000/analytics/category");
  return await res.json();
}

// GET: bar/line chart data — monthly totals
export async function fetchMonthlyAnalytics() {
  const res = await fetch("http://localhost:8000/analytics/monthly");
  return await res.json();
}

// GET: total spending value
export async function fetchTotalAnalytics() {
  const res = await fetch("http://localhost:8000/analytics/total");
  return await res.json();
}
