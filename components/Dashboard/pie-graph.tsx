'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useOrderStore } from '@/lib/store/orderstore';

const chartConfig = {
  sales: {
    label: 'Sales'
  },
  completed: {
    label: 'Completed',
    color: 'hsl(var(--chart-1))'
  },
  processing: {
    label: 'Processing',
    color: 'hsl(var(--chart-2))'
  },
  pending: {
    label: 'Pending',
    color: 'hsl(var(--chart-3))'
  },
  cancelled: {
    label: 'Cancelled',
    color: 'hsl(var(--chart-4))'
  }
} satisfies ChartConfig;

export function PieGraph() {
  const { orderStatus } = useOrderStore();

  // Map orderStatus data to the chart format
  const chartData = React.useMemo(() => [
    { sale: 'Completed', sales: orderStatus.completed, fill: 'var(--color-completed)' },
    { sale: 'Processing', sales: orderStatus.processing, fill: 'var(--color-processing)' },
    { sale: 'Pending', sales: orderStatus.pending, fill: 'var(--color-pending)' },
    { sale: 'Cancelled', sales: orderStatus.cancelled, fill: 'var(--color-cancelled)' }
  ], [orderStatus]);

  // Calculate the total sales from orderStatus
  const totalSales = chartData.reduce((acc, curr) => acc + curr.sales, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Sales - Order Status</CardTitle>
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
                          {totalSales.toLocaleString()}
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
          Showing total sales for the last 1 month
        </div>
      </CardFooter>
    </Card>
  );
}
