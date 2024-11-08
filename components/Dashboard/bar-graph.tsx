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
  { date: '2024-04-01', kilifi: 222, mombasa: 150, kwale: 100 },
  { date: '2024-04-02', kilifi: 97, mombasa: 180, kwale: 500 },
  { date: '2024-04-03', kilifi: 167, mombasa: 120, kwale: 100 },
  { date: '2024-04-04', kilifi: 242, mombasa: 260, kwale: 100 },
  { date: '2024-04-05', kilifi: 373, mombasa: 290, kwale: 100 },
  { date: '2024-04-06', kilifi: 301, mombasa: 340, kwale: 500 },
  { date: '2024-04-07', kilifi: 245, mombasa: 180, kwale: 100 },
  { date: '2024-04-08', kilifi: 409, mombasa: 320, kwale: 100 },
  { date: '2024-04-09', kilifi: 59, mombasa: 110, kwale: 100 },
  { date: '2024-04-10', kilifi: 261, mombasa: 190, kwale: 100 },
  { date: '2024-04-11', kilifi: 327, mombasa: 350, kwale: 100 },
  { date: '2024-04-12', kilifi: 292, mombasa: 210, kwale: 100 },
  { date: '2024-04-13', kilifi: 342, mombasa: 380, kwale: 100 },
  { date: '2024-04-14', kilifi: 137, mombasa: 220, kwale: 100 },
  { date: '2024-04-15', kilifi: 120, mombasa: 170, kwale: 200 },
  { date: '2024-04-16', kilifi: 138, mombasa: 190, kwale: 100 },
  { date: '2024-04-17', kilifi: 446, mombasa: 360, kwale: 130 },
  { date: '2024-04-18', kilifi: 364, mombasa: 410, kwale: 100 },
  { date: '2024-04-19', kilifi: 243, mombasa: 180, kwale: 200 },
  { date: '2024-04-20', kilifi: 89, mombasa: 150, kwale: 100 },
  { date: '2024-04-21', kilifi: 137, mombasa: 200, kwale: 100 },
  { date: '2024-04-22', kilifi: 224, mombasa: 170, kwale: 100 },
  { date: '2024-04-23', kilifi: 138, mombasa: 230, kwale: 100 },
  { date: '2024-04-24', kilifi: 387, mombasa: 290, kwale: 100 },
  { date: '2024-04-25', kilifi: 215, mombasa: 250, kwale: 100 },
  { date: '2024-04-26', kilifi: 75, mombasa: 130, kwale: 100 },
  { date: '2024-04-27', kilifi: 383, mombasa: 420, kwale: 100 },
  { date: '2024-04-28', kilifi: 122, mombasa: 180, kwale: 100 },
  { date: '2024-04-29', kilifi: 315, mombasa: 240, kwale: 100 },
  { date: '2024-04-30', kilifi: 454, mombasa: 380, kwale: 120 },
  { date: '2024-05-01', kilifi: 165, mombasa: 220, kwale: 140 },
  { date: '2024-05-02', kilifi: 293, mombasa: 310, kwale: 103 },
  { date: '2024-05-03', kilifi: 247, mombasa: 190, kwale: 100 },
  { date: '2024-05-04', kilifi: 385, mombasa: 420, kwale: 100 },
  { date: '2024-05-05', kilifi: 481, mombasa: 390, kwale: 550 },
  { date: '2024-05-06', kilifi: 498, mombasa: 520, kwale: 130 },
  { date: '2024-05-07', kilifi: 388, mombasa: 300, kwale: 100 },
  { date: '2024-05-08', kilifi: 149, mombasa: 210, kwale: 100 },
  { date: '2024-05-09', kilifi: 227, mombasa: 180, kwale: 100 },
  { date: '2024-05-10', kilifi: 293, mombasa: 330, kwale: 100 },
  { date: '2024-05-11', kilifi: 335, mombasa: 270, kwale: 100 },
  { date: '2024-05-12', kilifi: 197, mombasa: 240, kwale: 100 },
  { date: '2024-05-13', kilifi: 197, mombasa: 160, kwale: 100 },
  { date: '2024-05-14', kilifi: 448, mombasa: 490, kwale: 100 },
  { date: '2024-05-15', kilifi: 473, mombasa: 380, kwale: 100 },
  { date: '2024-05-16', kilifi: 338, mombasa: 400, kwale: 100 },
  { date: '2024-05-17', kilifi: 499, mombasa: 420, kwale: 100 },
  { date: '2024-05-18', kilifi: 315, mombasa: 350, kwale: 100 },
  { date: '2024-05-19', kilifi: 235, mombasa: 180, kwale: 100 },
  { date: '2024-05-20', kilifi: 177, mombasa: 230, kwale: 100 },
  { date: '2024-05-21', kilifi: 82, mombasa: 140, kwale: 100 },
  { date: '2024-05-22', kilifi: 81, mombasa: 120, kwale: 100 },
  { date: '2024-05-23', kilifi: 252, mombasa: 290, kwale: 100 },
  { date: '2024-05-24', kilifi: 294, mombasa: 220, kwale: 330 },
  { date: '2024-05-25', kilifi: 201, mombasa: 250, kwale: 100 },
  { date: '2024-05-26', kilifi: 213, mombasa: 170, kwale: 100 },
  { date: '2024-05-27', kilifi: 420, mombasa: 460, kwale: 100 },
  { date: '2024-05-28', kilifi: 233, mombasa: 190, kwale: 100 },
  { date: '2024-05-29', kilifi: 78, mombasa: 130, kwale: 100 },
  { date: '2024-05-30', kilifi: 340, mombasa: 280, kwale: 100 },
  { date: '2024-05-31', kilifi: 178, mombasa: 230, kwale: 100 },
  { date: '2024-06-01', kilifi: 178, mombasa: 200, kwale: 100 },
  { date: '2024-06-02', kilifi: 470, mombasa: 410, kwale: 100 },
  { date: '2024-06-03', kilifi: 103, mombasa: 160, kwale: 100 },
  { date: '2024-06-04', kilifi: 439, mombasa: 380, kwale: 100 },
  { date: '2024-06-05', kilifi: 88, mombasa: 140, kwale: 100 },
  { date: '2024-06-06', kilifi: 294, mombasa: 250, kwale: 100 },
  { date: '2024-06-07', kilifi: 323, mombasa: 370, kwale: 100 },
  { date: '2024-06-08', kilifi: 385, mombasa: 320, kwale: 10 },
  { date: '2024-06-09', kilifi: 438, mombasa: 480, kwale: 100 },
  { date: '2024-06-10', kilifi: 155, mombasa: 200, kwale: 100 },
  { date: '2024-06-11', kilifi: 92, mombasa: 150, kwale: 100 },
  { date: '2024-06-12', kilifi: 492, mombasa: 420, kwale: 100 },
  { date: '2024-06-13', kilifi: 81, mombasa: 130, kwale: 10 },
  { date: '2024-06-14', kilifi: 426, mombasa: 380, kwale: 150 },
  { date: '2024-06-15', kilifi: 307, mombasa: 350, kwale: 100 },
  { date: '2024-06-16', kilifi: 371, mombasa: 310, kwale: 100 },
  { date: '2024-06-17', kilifi: 475, mombasa: 520, kwale: 400 },
  { date: '2024-06-18', kilifi: 107, mombasa: 170, kwale: 100 },
  { date: '2024-06-19', kilifi: 341, mombasa: 290, kwale: 100 },
  { date: '2024-06-20', kilifi: 408, mombasa: 450, kwale: 100 },
  { date: '2024-06-21', kilifi: 169, mombasa: 210, kwale: 130 },
  { date: '2024-06-22', kilifi: 317, mombasa: 270, kwale: 100 },
  { date: '2024-06-23', kilifi: 480, mombasa: 530, kwale: 100 },
  { date: '2024-06-24', kilifi: 132, mombasa: 180, kwale: 102 },
  { date: '2024-06-25', kilifi: 141, mombasa: 190, kwale: 100 },
  { date: '2024-06-26', kilifi: 434, mombasa: 380, kwale: 100 },
  { date: '2024-06-27', kilifi: 448, mombasa: 490, kwale: 100 },
  { date: '2024-06-28', kilifi: 149, mombasa: 200, kwale: 100 },
  { date: '2024-06-29', kilifi: 103, mombasa: 160, kwale: 100 },
  { date: '2024-06-30', kilifi: 446, mombasa: 400, kwale: 100 },
];

const chartConfig = {
  views: {
    label: 'Page Views'
  },
  kilifi: {
    label: 'Kilifi',
    color: 'hsl(var(--chart-1))'
  },
  mombasa: {
    label: 'Mombasa',
    color: 'hsl(var(--chart-2))'
  },
  kwale: {
    label: 'Kwale',
    color: 'hsl(var(--chart-3))'
  },
} satisfies ChartConfig;

export function BarGraph() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('kilifi');

  const total = React.useMemo(
    () => ({
      kilifi: chartData.reduce((acc, curr) => acc + curr.kilifi, 0),
      mombasa: chartData.reduce((acc, curr) => acc + curr.mombasa, 0),
      kwale: chartData.reduce((acc, curr) => acc + curr.kwale, 0)
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
          {['kilifi', 'mombasa','kwale'].map((key) => {
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
