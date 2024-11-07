import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const recentOrders = [
  { id: 'ORD001', customer: 'John Doe', total: '$156.00', status: 'Completed', date: '2023-06-15' },
  { id: 'ORD002', customer: 'Jane Smith', total: '$89.50', status: 'Processing', date: '2023-06-14' },
  { id: 'ORD003', customer: 'Bob Johnson', total: '$210.75', status: 'Pending', date: '2023-06-13' },
  { id: 'ORD004', customer: 'Alice Brown', total: '$45.25', status: 'Completed', date: '2023-06-12' },
]

export const RecentOrders = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Latest customer orders and their status</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>
                  <Badge variant={order.status === 'Completed' ? 'default' : 
                                  order.status === 'Processing' ? 'outline' : 'secondary'}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}