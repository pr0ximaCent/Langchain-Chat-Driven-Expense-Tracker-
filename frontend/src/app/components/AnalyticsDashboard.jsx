"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  fetchCategoryAnalytics,
  fetchMonthlyAnalytics,
  fetchTotalAnalytics,
} from "../../../lib/api";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#a020f0",
  "#FF4444",
  "#50fa7b",
];

export default function AnalyticsDashboard() {
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCategoryAnalytics().then(setCategoryData);
    fetchMonthlyAnalytics().then(setMonthlyData);
    fetchTotalAnalytics().then((res) => setTotal(res.total));
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h2>All-Time Spending: <b>{total} ৳</b></h2>
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ width: 400, height: 350 }}>
          <h3>Spending by Category</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ category, total }) => `${category}: ${total} ৳`}
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ width: 450, height: 350 }}>
          <h3>Monthly Totals</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <XAxis dataKey={(d) => `${d.month}/${d.year}`} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
