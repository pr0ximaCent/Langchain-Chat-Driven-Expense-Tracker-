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

// Pie slice colors
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#a020f0",
  "#FF4444",
  "#50fa7b",
];

// Pie label renderer to avoid cropped labels
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  category,
  total,
}) => {
  const RADIAN = Math.PI / 180;
  // Calculate label position outside the slice with more distance
  const radius = outerRadius + 35;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#333"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight="500"
      style={{ 
        pointerEvents: "none", 
        filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.3))" 
      }}
    >
      {category}: {total} ৳
    </text>
  );
};

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
    <div className="p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-lg">
          All-Time Spending: <strong>{total} ৳</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Spending by Category
          </h2>
          <div className="w-full h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 40, right: 60, bottom: 40, left: 60 }}>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="total"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} ৳`, "Amount"]}
                  labelFormatter={(label) => `Category: ${label}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Monthly Totals
          </h2>
          <div className="w-full h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <XAxis
                  dataKey="month"
                  tickFormatter={(d) => `${d.month}/${d.year}`}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${value} ৳`, "Total Spending"]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                <Bar dataKey="total" fill="#0088FE" name="Monthly Total (৳)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}