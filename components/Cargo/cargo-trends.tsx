"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', wheat: 4000, maize: 2400, rice: 2400 },
  { name: 'Feb', wheat: 3000, maize: 1398, rice: 2210 },
  { name: 'Mar', wheat: 2000, maize: 9800, rice: 2290 },
  { name: 'Apr', wheat: 2780, maize: 3908, rice: 2000 },
  { name: 'May', wheat: 1890, maize: 4800, rice: 2181 },
  { name: 'Jun', wheat: 2390, maize: 3800, rice: 2500 },
  { name: 'Jul', wheat: 3490, maize: 4300, rice: 2100 },
]

export const CargoTrends = () => {
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