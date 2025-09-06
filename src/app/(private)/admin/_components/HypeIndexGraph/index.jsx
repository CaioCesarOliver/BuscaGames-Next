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

// Gera dados do hype index com crescimento/queda exponencial
function generateHypeData(baseHype = 50, months = 12) {
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

    // Crescimento rápido inicial e desaceleração depois
    const exponentialGrowth = Math.pow(1.3, Math.min(i, 5)); // crescimento rápido nos primeiros 5 meses
    const decayFactor = i > 5 ? Math.pow(0.95, i - 5) : 1; // depois começa a cair um pouco

    // Pequenas oscilações para simular hype real
    const volatility = 1 + Math.sin(i / 2) * 0.1;

    const hypeValue = Math.round(
      baseHype * exponentialGrowth * decayFactor * volatility
    );

    data.push({
      month: monthNames[monthIndex],
      hype: hypeValue,
    });
  }
  return data;
}

export default function HypeIndexGraph({
  gameName = "Jogo Exemplo",
  baseHype = 50,
}) {
  const data = useMemo(() => generateHypeData(baseHype, 12), [baseHype]);

  return (
    <div className="bg-gray-900 p-4 rounded-2xl shadow-xl w-full h-80">
      <h2 className="text-xl font-bold text-white mb-4">{gameName}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#333" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip
            formatter={(val) => [val, "Hype"]}
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Line
            type="monotone"
            dataKey="hype"
            stroke="#3b82f6"
            strokeWidth={3}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
