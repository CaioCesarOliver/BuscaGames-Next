"use client";
import { useMemo } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function generateHypeData(base = 50, months = 12) {
  const monthNames = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  const today = new Date();
  const data = [];
  for (let i = 0; i < months; i++) {
    const monthIndex = (today.getMonth() + i) % 12;
    const growth = Math.pow(1.3, Math.min(i, 5));
    const decay = i > 5 ? Math.pow(0.95, i - 5) : 1;
    const oscillation = 1 + Math.sin(i / 2) * 0.1;
    data.push({
      month: monthNames[monthIndex],
      value: Math.round(base * growth * decay * oscillation),
    });
  }
  return data;
}

export default function HypeIndexGraph({
  gameName = "Jogo Exemplo",
  base = 50,
  months = 12,
}) {
  const data = useMemo(() => generateHypeData(base, months), [base, months]);
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-xl w-full h-80">
      <h2 className="text-xl font-bold mb-4 dark:text-purple-300">
        Hype — {gameName}
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(v) => [v, "Hype Index"]} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={3}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
