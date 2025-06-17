'use client';

import { Pie, PieChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
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

export default function TotalStatusPieChart({
  data,
}: {
  data: { keyType: string; keyFunction: string; Available: number; InUse: number; Lost: number }[];
}) {
  // Aggregate totals from all key types
  const totalCounts = data.reduce(
    (acc, item) => ({
      Available: acc.Available + item.Available,
      InUse: acc.InUse + item.InUse,
      Lost: acc.Lost + item.Lost,
    }),
    { Available: 0, InUse: 0, Lost: 0 },
  );

  // Convert to pie chart format
  const pieData = [
    {
      status: 'Available',
      count: totalCounts.Available,
      fill: 'var(--color-Available)',
    },
    {
      status: 'InUse',
      count: totalCounts.InUse,
      fill: 'var(--color-InUse)',
    },
    {
      status: 'Lost',
      count: totalCounts.Lost,
      fill: 'var(--color-Lost)',
    },
  ].filter((item) => item.count > 0); // Only show non-zero values

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Status all keys</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <Pie data={pieData} dataKey="count" />
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-md">
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2 text-sm">
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: data.fill }}
                          />
                          <span className="font-medium">
                            {data.status === 'InUse' ? 'In Use' : data.status}:
                          </span>
                          <span className="font-medium">{data.count}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
