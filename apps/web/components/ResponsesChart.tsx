"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function ResponsesChart({ data }: { data: any[] }) {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid />

      <XAxis dataKey="date" />

      <YAxis />

      <Tooltip />

      <Line type="monotone" dataKey="count" />
    </LineChart>
  );
}
