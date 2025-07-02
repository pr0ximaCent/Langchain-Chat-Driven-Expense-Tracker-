"use client";
import React, { useState, useEffect } from "react";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import { postExpense, fetchExpenses } from "../../lib/api";
import { Home, ReceiptText, PieChart } from "lucide-react";

export default function Home() {
  const [entry, setEntry] = useState("");
  const [response, setResponse] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadExpenses = async () => {
    const data = await fetchExpenses();
    setExpenses(data);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");
    const result = await postExpense(entry);
    setEntry("");
    setResponse(
      result.status === "saved"
        ? "Expense saved!"
        : result.error || "Something went wrong."
    );
    await loadExpenses();
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#10101a] via-[#181826] to-[#21213a] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col items-center py-8 px-3 bg-black/40 backdrop-blur-lg min-h-screen w-20 border-r border-gray-800 shadow-2xl">
        <div className="mb-12">
          <img src="/favicon.ico" alt="Logo" className="rounded-xl w-12 h-12" />
        </div>
        <nav className="flex flex-col gap-8">
          <button title="Dashboard">
            <Home className="text-white/70 w-7 h-7" />
          </button>
          <button title="Expenses">
            <ReceiptText className="text-white/70 w-7 h-7" />
          </button>
          <button title="Analytics">
            <PieChart className="text-white/70 w-7 h-7" />
          </button>
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 p-4 sm:p-8 flex flex-col gap-6">
        {/* Header */}
        <header className="flex justify-between items-center pb-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow">
            <span role="img" aria-label="chain">⛓️</span> FinChain
            <span className="text-purple-300"> — Expense Tracker</span>
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-white/70 font-medium">Sabik Aftahee</span>
            <img
              src={`https://ui-avatars.com/api/?name=Sabik+Aftahee&background=15151f&color=fff&rounded=true&size=32`}
              alt="avatar"
              className="rounded-full border border-gray-800"
              width={32}
              height={32}
            />
          </div>
        </header>

        {/* Chat Input Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-black/30 backdrop-blur rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-center shadow-lg"
        >
          <textarea
            className="bg-black/60 border border-gray-700 text-white text-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-2/3 resize-none"
            rows={2}
            value={entry}
            onChange={e => setEntry(e.target.value)}
            placeholder="Type an expense, e.g. Spent 450 on Uber and snacks"
            required
          />
          <button
            className="bg-gradient-to-tr from-purple-600 to-blue-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-2 rounded-xl shadow-lg transition-all"
            type="submit"
            disabled={loading || !entry.trim()}
          >
            {loading ? "Saving..." : "Add Expense"}
          </button>
        </form>
        {response && (
          <div className="mb-2 text-center text-green-400 font-semibold">{response}</div>
        )}

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Analytics */}
          <div className="flex-1">
            <div className="bg-black/30 backdrop-blur rounded-2xl p-6 shadow-xl">
              <AnalyticsDashboard />
            </div>
          </div>
          {/* Recent Expenses */}
          <div className="w-full lg:w-1/3">
            <div className="bg-black/40 backdrop-blur-lg rounded-2xl shadow-xl p-5 min-h-[300px]">
              <h3 className="text-xl font-bold mb-5 text-white/80">Recent Expenses</h3>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {expenses.length === 0 && (
                  <div className="text-gray-500 text-sm">No expenses yet.</div>
                )}
                {expenses.map(exp => (
                  <div
                    key={exp._id}
                    className="bg-gradient-to-tr from-[#1e2233] to-[#222] border border-gray-800/70 rounded-lg px-4 py-3 flex flex-col gap-1 shadow"
                  >
                    <div className="text-xs text-gray-400">
                      {new Date(exp.timestamp).toLocaleString()}
                    </div>
                    <div className="font-medium text-white/90">{exp.raw}</div>
                    {exp.parsed && exp.parsed.length > 0 && (
                      <div className="flex flex-wrap gap-2 text-xs mt-1">
                        {exp.parsed.map((item, i) => (
                          <span
                            key={i}
                            className="bg-purple-700/70 text-white rounded-full px-2 py-0.5"
                          >
                            {item.item}: {item.amount}৳ <span className="opacity-80">[{item.category}]</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
