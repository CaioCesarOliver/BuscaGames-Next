"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Dados fake para simular crescimento exponencial de usuários
const data = [
  { month: "Jan", users: 50 },
  { month: "Fev", users: 120 },
  { month: "Mar", users: 300 },
  { month: "Abr", users: 750 },
  { month: "Mai", users: 1800 },
  { month: "Jun", users: 4000 },
];

export default function UsersGraph() {
  return (
    <div className="bg-gray-900 p-4 rounded-2xl shadow-xl w-full h-80">
      <h2 className="text-xl font-bold text-white mb-4">
        Crescimento de Usuários
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#333" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#10b981"
            strokeWidth={3}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
