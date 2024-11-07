'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

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
  { month: 'January', malindi: 186, kilifi: 80 },
  { month: 'February', malindi: 305, kilifi: 200 },
  { month: 'March', malindi: 237, kilifi: 120 },
  { month: 'April', malindi: 73, kilifi: 190 },
  { month: 'May', malindi: 209, kilifi: 130 },
  { month: 'June', malindi: 214, kilifi: 140 }
];

const chartConfig = {
  malindi: {
    label: 'Malindi',
    color: 'hsl(var(--chart-1))'
  },
  kilifi: {
    label: 'Kilifi',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig;

export function AreaGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Distibution - Stacked</CardTitle>
        <CardDescription>
          Showing total sales for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[310px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="malindi"
              type="natural"
              fill="var(--color-malindi)"
              fillOpacity={0.4}
              stroke="var(--color-malindi)"
              stackId="a"
            />
            <Area
              dataKey="kilifi"
              type="natural"
              fill="var(--color-kilifi)"
              fillOpacity={0.4}
              stroke="var(--color-kilifi)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
