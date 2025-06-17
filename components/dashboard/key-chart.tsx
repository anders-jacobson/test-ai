'use client';
import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  Available: {
    label: 'Available',
    color: 'var(--chart-1)',
  },
  InUse: {
    label: 'In Use',
    color: 'var(--chart-2)',
  },
  Lost: {
    label: 'Lost',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig;

export default function KeyChart({
  data,
}: {
  data: { keyType: string; Available: number; InUse: number; Lost: number }[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key status</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="keyType" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="Available"
              stackId="a"
              fill="var(--color-Available)"
              radius={[0, 0, 4, 4]}
            />
            <Bar dataKey="InUse" stackId="a" fill="var(--color-InUse)" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Lost" stackId="a" fill="var(--color-Lost)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
