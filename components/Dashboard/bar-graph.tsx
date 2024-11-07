'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

export const description = 'An interactive bar chart';

const chartData = [
  { date: '2024-04-01', kilifi: 222, malindi: 150 },
  { date: '2024-04-02', kilifi: 97, malindi: 180 },
  { date: '2024-04-03', kilifi: 167, malindi: 120 },
  { date: '2024-04-04', kilifi: 242, malindi: 260 },
  { date: '2024-04-05', kilifi: 373, malindi: 290 },
  { date: '2024-04-06', kilifi: 301, malindi: 340 },
  { date: '2024-04-07', kilifi: 245, malindi: 180 },
  { date: '2024-04-08', kilifi: 409, malindi: 320 },
  { date: '2024-04-09', kilifi: 59, malindi: 110 },
  { date: '2024-04-10', kilifi: 261, malindi: 190 },
  { date: '2024-04-11', kilifi: 327, malindi: 350 },
  { date: '2024-04-12', kilifi: 292, malindi: 210 },
  { date: '2024-04-13', kilifi: 342, malindi: 380 },
  { date: '2024-04-14', kilifi: 137, malindi: 220 },
  { date: '2024-04-15', kilifi: 120, malindi: 170 },
  { date: '2024-04-16', kilifi: 138, malindi: 190 },
  { date: '2024-04-17', kilifi: 446, malindi: 360 },
  { date: '2024-04-18', kilifi: 364, malindi: 410 },
  { date: '2024-04-19', kilifi: 243, malindi: 180 },
  { date: '2024-04-20', kilifi: 89, malindi: 150 },
  { date: '2024-04-21', kilifi: 137, malindi: 200 },
  { date: '2024-04-22', kilifi: 224, malindi: 170 },
  { date: '2024-04-23', kilifi: 138, malindi: 230 },
  { date: '2024-04-24', kilifi: 387, malindi: 290 },
  { date: '2024-04-25', kilifi: 215, malindi: 250 },
  { date: '2024-04-26', kilifi: 75, malindi: 130 },
  { date: '2024-04-27', kilifi: 383, malindi: 420 },
  { date: '2024-04-28', kilifi: 122, malindi: 180 },
  { date: '2024-04-29', kilifi: 315, malindi: 240 },
  { date: '2024-04-30', kilifi: 454, malindi: 380 },
  { date: '2024-05-01', kilifi: 165, malindi: 220 },
  { date: '2024-05-02', kilifi: 293, malindi: 310 },
  { date: '2024-05-03', kilifi: 247, malindi: 190 },
  { date: '2024-05-04', kilifi: 385, malindi: 420 },
  { date: '2024-05-05', kilifi: 481, malindi: 390 },
  { date: '2024-05-06', kilifi: 498, malindi: 520 },
  { date: '2024-05-07', kilifi: 388, malindi: 300 },
  { date: '2024-05-08', kilifi: 149, malindi: 210 },
  { date: '2024-05-09', kilifi: 227, malindi: 180 },
  { date: '2024-05-10', kilifi: 293, malindi: 330 },
  { date: '2024-05-11', kilifi: 335, malindi: 270 },
  { date: '2024-05-12', kilifi: 197, malindi: 240 },
  { date: '2024-05-13', kilifi: 197, malindi: 160 },
  { date: '2024-05-14', kilifi: 448, malindi: 490 },
  { date: '2024-05-15', kilifi: 473, malindi: 380 },
  { date: '2024-05-16', kilifi: 338, malindi: 400 },
  { date: '2024-05-17', kilifi: 499, malindi: 420 },
  { date: '2024-05-18', kilifi: 315, malindi: 350 },
  { date: '2024-05-19', kilifi: 235, malindi: 180 },
  { date: '2024-05-20', kilifi: 177, malindi: 230 },
  { date: '2024-05-21', kilifi: 82, malindi: 140 },
  { date: '2024-05-22', kilifi: 81, malindi: 120 },
  { date: '2024-05-23', kilifi: 252, malindi: 290 },
  { date: '2024-05-24', kilifi: 294, malindi: 220 },
  { date: '2024-05-25', kilifi: 201, malindi: 250 },
  { date: '2024-05-26', kilifi: 213, malindi: 170 },
  { date: '2024-05-27', kilifi: 420, malindi: 460 },
  { date: '2024-05-28', kilifi: 233, malindi: 190 },
  { date: '2024-05-29', kilifi: 78, malindi: 130 },
  { date: '2024-05-30', kilifi: 340, malindi: 280 },
  { date: '2024-05-31', kilifi: 178, malindi: 230 },
  { date: '2024-06-01', kilifi: 178, malindi: 200 },
  { date: '2024-06-02', kilifi: 470, malindi: 410 },
  { date: '2024-06-03', kilifi: 103, malindi: 160 },
  { date: '2024-06-04', kilifi: 439, malindi: 380 },
  { date: '2024-06-05', kilifi: 88, malindi: 140 },
  { date: '2024-06-06', kilifi: 294, malindi: 250 },
  { date: '2024-06-07', kilifi: 323, malindi: 370 },
  { date: '2024-06-08', kilifi: 385, malindi: 320 },
  { date: '2024-06-09', kilifi: 438, malindi: 480 },
  { date: '2024-06-10', kilifi: 155, malindi: 200 },
  { date: '2024-06-11', kilifi: 92, malindi: 150 },
  { date: '2024-06-12', kilifi: 492, malindi: 420 },
  { date: '2024-06-13', kilifi: 81, malindi: 130 },
  { date: '2024-06-14', kilifi: 426, malindi: 380 },
  { date: '2024-06-15', kilifi: 307, malindi: 350 },
  { date: '2024-06-16', kilifi: 371, malindi: 310 },
  { date: '2024-06-17', kilifi: 475, malindi: 520 },
  { date: '2024-06-18', kilifi: 107, malindi: 170 },
  { date: '2024-06-19', kilifi: 341, malindi: 290 },
  { date: '2024-06-20', kilifi: 408, malindi: 450 },
  { date: '2024-06-21', kilifi: 169, malindi: 210 },
  { date: '2024-06-22', kilifi: 317, malindi: 270 },
  { date: '2024-06-23', kilifi: 480, malindi: 530 },
  { date: '2024-06-24', kilifi: 132, malindi: 180 },
  { date: '2024-06-25', kilifi: 141, malindi: 190 },
  { date: '2024-06-26', kilifi: 434, malindi: 380 },
  { date: '2024-06-27', kilifi: 448, malindi: 490 },
  { date: '2024-06-28', kilifi: 149, malindi: 200 },
  { date: '2024-06-29', kilifi: 103, malindi: 160 },
  { date: '2024-06-30', kilifi: 446, malindi: 400 }
];

const chartConfig = {
  views: {
    label: 'Page Views'
  },
  kilifi: {
    label: 'Kilifi',
    color: 'hsl(var(--chart-1))'
  },
  malindi: {
    label: 'Malindi',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig;

export function BarGraph() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('kilifi');

  const total = React.useMemo(
    () => ({
      kilifi: chartData.reduce((acc, curr) => acc + curr.kilifi, 0),
      malindi: chartData.reduce((acc, curr) => acc + curr.malindi, 0)
    }),
    []
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Sales Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total sales for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {['kilifi', 'malindi'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
