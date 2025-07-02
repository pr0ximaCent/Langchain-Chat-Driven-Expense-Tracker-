"use client";
import React, { useState, useEffect } from "react";
import {
  Home, ReceiptText, PieChart, Search, Plus, TrendingUp, Calendar, Filter,
  MoreHorizontal, ArrowUpRight, ArrowDownRight, Wallet, Target, Activity,
  Bell, Settings, User, ChevronDown, Eye, ExternalLink
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell
} from "recharts";

// 🟢 Use your real API functions
import {
  postExpense, fetchExpenses, fetchCategoryAnalytics,
  fetchMonthlyAnalytics, fetchTotalAnalytics
} from "../../lib/api";

// Utility for comma formatting
function formatCurrency(n: number) {
  return n.toLocaleString("en-US");
}

export default function FinancialDashboard() {
  // State
  const [entry, setEntry] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const [expenses, setExpenses] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [total, setTotal] = useState(0);

  // Fetch all analytics & expenses
  async function loadAll() {
    const [exp, cat, mon, tot] = await Promise.all([
      fetchExpenses(),
      fetchCategoryAnalytics(),
      fetchMonthlyAnalytics(),
      fetchTotalAnalytics()
    ]);
    setExpenses(exp);
    setCategoryData(
      cat.map((c: any) => ({
        name: c.category,
        value: c.total,
        color: COLORS[categoryColorsIdx(c.category)],
      }))
    );
    setMonthlyData(
      mon.map((m: any) => ({
        month: `${m.month}/${m.year}`,
        amount: m.total,
      }))
    );
    setTotal(tot.total || 0);
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line
  }, []);

  // Add expense handler
  const handleSubmit = async () => {
    if (!entry.trim()) return;
    setLoading(true);
    setResponse("");
    const result = await postExpense(entry);
    setEntry("");
    setResponse(result.status === "saved" ? "Expense added successfully!" : (result.error || "Something went wrong."));
    await loadAll();
    setLoading(false);
    setTimeout(() => setResponse(""), 3000);
  };

  // Colors for chart
  const COLORS = [
    "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#6B7280", "#FFBB28"
  ];
  function categoryColorsIdx(cat: string) {
    switch ((cat || "").toLowerCase()) {
      case "food": return 0;
      case "transportation": return 1;
      case "shopping": return 2;
      case "entertainment": return 3;
      case "utilities": return 4;
      case "healthcare": return 5;
      default: return 6;
    }
  }

  return (
    <div className="min-h-screen bg-[#0F1117] text-white">
      {/* Header */}
      <header className="bg-[#1A1D29] border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FC</span>
              </div>
              <h1 className="text-xl font-bold">FinChain</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-[#0F1117] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 w-64"
                disabled
              />
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors"
              disabled
            >
              <Plus className="w-4 h-4" />
              <span>Add transaction</span>
            </button>
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
              <div className="flex items-center space-x-2">
                <img
                  src="https://ui-avatars.com/api/?name=Sabik+Aftahee&background=3b82f6&color=fff&rounded=true&size=32"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-gray-300">Sabik Aftahee</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#1A1D29] border-r border-gray-800 min-h-[calc(100vh-80px)]">
          <nav className="p-4 space-y-2">
            <div className="mb-6">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">NAVIGATION</p>
              <div className="space-y-1">
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-600/30">
                  <Home className="w-4 h-4" />
                  <span className="text-sm font-medium">Dashboard</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
                  <ReceiptText className="w-4 h-4" />
                  <span className="text-sm">Transactions</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
                  <PieChart className="w-4 h-4" />
                  <span className="text-sm">Analytics</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
                  <Wallet className="w-4 h-4" />
                  <span className="text-sm">Budget</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
                  <Target className="w-4 h-4" />
                  <span className="text-sm">Goals</span>
                </a>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">ACCOUNT</p>
              <div className="space-y-1">
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Profile</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">Settings</span>
                </a>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-[#0F1117]">
          {/* Dashboard Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold">Dashboard</h2>
              <p className="text-sm text-gray-400">All data</p>
            </div>
            <p className="text-gray-400 text-sm">Hi Sabik, here are your financial data</p>
          </div>

          {/* Add Expense Input */}
          <div className="mb-6">
            <div className="bg-[#1A1D29] border border-gray-800 rounded-xl p-4">
              <div className="flex gap-4">
                <textarea
                  rows={1}
                  value={entry}
                  onChange={e => setEntry(e.target.value)}
                  placeholder="Type an expense... e.g., Spent 450 on Uber and snacks"
                  className="flex-1 bg-[#0F1117] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
                />
                <button
                  onClick={handleSubmit}
                  disabled={loading || !entry.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  {loading ? "Adding..." : "Add"}
                </button>
              </div>
              {response && (
                <div className="mt-3 p-2 bg-green-600/20 border border-green-600/30 rounded-lg">
                  <p className="text-green-400 text-sm">{response}</p>
                </div>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Total Balance */}
            <div className="bg-[#1A1D29] border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total spending</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">৳{formatCurrency(total)}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <Line type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Income & Expenses */}
            <div className="bg-[#1A1D29] border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Monthly Total</p>
                  <span className="text-2xl font-bold">৳{monthlyData.length ? formatCurrency(monthlyData[monthlyData.length - 1]?.amount || 0) : "0"}</span>
                </div>
                <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <Bar dataKey="amount" fill="#10B981" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Receipts Split Summary (Static Example) */}
            <div className="bg-[#1A1D29] border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Receipts split summary</p>
                  <span className="text-2xl font-bold">৳2,950</span>
                </div>
                <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1">
                  <span>View report</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
              <div className="relative w-24 h-24 mx-auto">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="#374151" strokeWidth="8" fill="none" />
                  <circle cx="48" cy="48" r="40" stroke="#10B981" strokeWidth="8" fill="none"
                    strokeDasharray={`${(2950 / 4000) * 251.2} 251.2`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-green-400">74%</span>
                </div>
              </div>
              <div className="text-center mt-2">
                <div className="flex items-center justify-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400">You paid</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-400">You owe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Spending Categories */}
            <div className="bg-[#1A1D29] border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Spending categories</h3>
                <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1">
                  <span>View report</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
              
              {/* FIXED: Increased container size and added padding */}
              <div className="flex justify-center mb-6">
                <div className="relative w-80 h-80" style={{ padding: '20px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ৳${value}`}
                        labelLine={false}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {categoryData.map((category, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-300 truncate">{category.name}</p>
                      <p className="text-xs text-gray-500">৳{formatCurrency(category.value)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Latest Transactions */}
            <div className="bg-[#1A1D29] border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Latest transactions</h3>
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:bg-gray-700 rounded">
                    <Filter className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1">
                    <span>View all</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {expenses
                  .slice()
                  .reverse()
                  .slice(0, 8)
                  .map((exp, idx) => (
                    <div key={exp._id || idx} className="flex items-center justify-between p-3 hover:bg-gray-800/50 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600/20">
                          <span className="text-sm">₳</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {exp.raw}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-gray-400">
                            <span>{new Date(exp.timestamp).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>
                              {exp.parsed && exp.parsed[0]?.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-semibold text-white`}>
                          {exp.parsed && exp.parsed.length > 0
                            ? `-${formatCurrency(exp.parsed[0]?.amount)}৳`
                            : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                {expenses.length === 0 && (
                  <div className="text-gray-500 text-sm">No expenses yet.</div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
