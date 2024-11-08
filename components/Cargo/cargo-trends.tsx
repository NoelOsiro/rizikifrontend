"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useMemo } from 'react'
import { useCargoStore } from "@/lib/store/cargoStore";


export const CargoTrends = () => {
  const getMonthlyTrends = useCargoStore((state) => state.getMonthlyTrends)

  // Prepare data for the chart
  const data = useMemo(() => {
    const trends = getMonthlyTrends()
    return Object.keys(trends).map(month => ({
      name: month,
      ...trends[month]
    }))
  }, [getMonthlyTrends])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cargo Trends</CardTitle>
        <CardDescription>Monthly trends of major cargo types</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="wheat" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="maize" stroke="#82ca9d" />
            <Line type="monotone" dataKey="rice" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
