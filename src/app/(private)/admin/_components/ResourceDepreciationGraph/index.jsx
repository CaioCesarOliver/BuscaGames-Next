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
import { generateProjectionData } from "@/utils/generateProjectionData";

export default function ResourceDepreciationGraph({
  initial = 100000,
  rate = 0.05,
  months = 12,
}) {
  const data = useMemo(
    () => generateProjectionData(initial, rate, months, "decay"),
    [initial, rate, months]
  );
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-xl w-full h-80">
      <h2 className="text-xl font-bold mb-4 dark:text-purple-300">
        Depreciação de Recursos
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            formatter={(v) => [
              `R$ ${v.toLocaleString("pt-BR")}`,
              "Valor Atual",
            ]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#ef4444"
            strokeWidth={3}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
