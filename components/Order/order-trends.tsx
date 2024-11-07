"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', orders: 400, revenue: 24000 },
  { name: 'Feb', orders: 300, revenue: 18000 },
  { name: 'Mar', orders: 200, revenue: 12000 },
  { name: 'Apr', orders: 278, revenue: 16680 },
  { name: 'May', orders: 189, revenue: 11340 },
  { name: 'Jun', orders: 239, revenue: 14340 },
  { name: 'Jul', orders: 349, revenue: 20940 },
]

export const OrderTrends = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Trends</CardTitle>
        <CardDescription>Monthly trends of orders and revenue</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}