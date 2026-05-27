"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface ResponsesChartProps {
  data: {
    date: string;
    count: number;
  }[];
}

export default function ResponsesChart({ data }: ResponsesChartProps) {
  // Clean fallback if data is missing, matching the dashboard layout card style
  if (!data?.length) {
    return (
      <div className="h-full w-full flex items-center justify-center min-h-[200px]">
        <p className="text-xs text-brand-muted italic">No response data available yet</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[240px] font-sans">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -25, // Pulled left to keep formatting clean inside the dashboard grid
            bottom: 0,
          }}
        >
          {/* Subtle grid lines matching the layout style */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(3, 79, 70, 0.08)" />

          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            stroke="#888888"
            tick={{ fontSize: 10 }}
            dy={8}
          />

          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            stroke="#888888"
            tick={{ fontSize: 10 }}
            dx={-5}
          />

          {/* Premium Floating Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid rgba(3, 79, 70, 0.15)",
              borderRadius: "0.75rem",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              padding: "8px 12px",
            }}
            labelStyle={{
              fontSize: "11px",
              fontWeight: 600,
              color: "#111827",
              marginBottom: "2px",
            }}
            itemStyle={{
              fontSize: "11px",
              color: "#034F46",
              fontWeight: 500,
              padding: 0,
            }}
            formatter={(value: number) => [`${value} entry(ies)`, "Submissions"]}
          />

          {/* The Data Line synchronized with your FormVerse theme */}
          <Line
            type="monotone"
            dataKey="count"
            stroke="#034F46" // Your premium brand color
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#034F46", strokeWidth: 0 }}
            activeDot={{
              r: 6,
              stroke: "#ffffff",
              strokeWidth: 2,
              fill: "#034F46",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
