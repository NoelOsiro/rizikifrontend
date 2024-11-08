"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useCargoStore } from "@/lib/store/cargoStore"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
// Adjust path to your store file

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export const CargoDistribution = () => {
  const cargoItems = useCargoStore((state) => state.cargoItems)

  // Aggregate cargo data by type
  const cargoDistribution = cargoItems.reduce((acc, { type, weight }) => {
    acc[type] = (acc[type] || 0) + weight
    return acc
  }, {} as Record<string, number>)

  // Convert aggregated data into an array suitable for the pie chart
  const chartData = Object.keys(cargoDistribution).map((key) => ({
    name: key,
    value: cargoDistribution[key]
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cargo Distribution</CardTitle>
        <CardDescription>Distribution of cargo types</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={130}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
