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
  { month: 'January', mombasa: 186, kilifi: 80, kwale: 100 },
  { month: 'February', mombasa: 305, kilifi: 200, kwale: 150 },
  { month: 'March', mombasa: 237, kilifi: 120, kwale: 180 },
  { month: 'April', mombasa: 73, kilifi: 190, kwale: 120 },
  { month: 'May', mombasa: 209, kilifi: 130, kwale: 140 },
  { month: 'June', mombasa: 214, kilifi: 140, kwale: 160 }
];

const chartConfig = {
  mombasa: {
    label: 'Mombasa',
    color: 'hsl(var(--chart-1))'
  },
  kilifi: {
    label: 'Kilifi',
    color: 'hsl(var(--chart-2))'
  },
  kwale: {
    label: 'Kwale',
    color: 'hsl(var(--chart-3))'
  },
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
              dataKey="mombasa"
              type="natural"
              fill="var(--color-mombasa)"
              fillOpacity={0.4}
              stroke="var(--color-mombasa)"
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
            <Area
              dataKey="kwale"
              type="natural"
              fill="var(--color-kwale)"
              fillOpacity={0.4}
              stroke="var(--color-kwale)"
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
