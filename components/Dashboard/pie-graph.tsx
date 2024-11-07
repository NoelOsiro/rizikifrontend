'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
const chartData = [
  { sale: 'Denno', sales: 25, fill: 'var(--color-Denno)' },
  { sale: 'Tello', sales: 20, fill: 'var(--color-Tello)' },
  { sale: 'Lucy', sales: 27, fill: 'var(--color-Lucy)' },
  { sale: 'Mercy', sales: 17, fill: 'var(--color-Lucky)' },
  { sale: 'Lucky', sales: 19, fill: 'var(--color-Mercy)' }
];

const chartConfig = {
  sales: {
    label: 'Sales'
  },
  Denno: {
    label: 'Denno',
    color: 'hsl(var(--chart-1))'
  },
  Tello: {
    label: 'Tello',
    color: 'hsl(var(--chart-2))'
  },
  Lucy: {
    label: 'Lucy',
    color: 'hsl(var(--chart-3))'
  },
  Mercy: {
    label: 'Mercy',
    color: 'hsl(var(--chart-4))'
  },
  Lucky: {
    label: 'Lucky',
    color: 'hsl(var(--chart-5))'
  }
} satisfies ChartConfig;

export function PieGraph() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.sales, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Sales - Agents</CardTitle>
        <CardDescription>September - October 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[360px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="sales"
              nameKey="sale"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Sales
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total sales for the last 1 months
        </div>
      </CardFooter>
    </Card>
  );
}
