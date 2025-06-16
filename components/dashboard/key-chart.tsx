'use client';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data: one bar per key type, stacked by status

const statusBars = [
  { key: 'Available', color: 'var(--chart-1)', name: 'Available' },
  { key: 'InUse', color: 'var(--chart-2)', name: 'In Use' },
  { key: 'Lost', color: 'var(--chart-3)', name: 'Lost' },
];

export default function KeyChart({
  data,
}: {
  data: { keyType: string; Available: number; InUse: number; Lost: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="keyType" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        {statusBars.map((bar) => (
          <Bar key={bar.key} dataKey={bar.key} stackId="a" fill={bar.color} name={bar.name} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
