"use client";
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { useOrderStore } from '@/lib/store/orderstore';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export const OrderStatusDistribution = () => {
  const { orderStatus } = useOrderStore()

  const data = [
    { name: 'Completed', value: orderStatus.completed },
    { name: 'Processing', value: orderStatus.processing },
    { name: 'Pending', value: orderStatus.pending },
    { name: 'Cancelled', value: orderStatus.cancelled },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Status Distribution</CardTitle>
        <CardDescription>Distribution of order statuses</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={135}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
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
