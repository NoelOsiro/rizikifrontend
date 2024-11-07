import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const recentShipments = [
  { id: 'SH001', destination: 'Nairobi', status: 'In Transit', eta: '2023-06-15' },
  { id: 'SH002', destination: 'Mombasa', status: 'Delivered', eta: '2023-06-10' },
  { id: 'SH003', destination: 'Kisumu', status: 'Pending', eta: '2023-06-20' },
  { id: 'SH004', destination: 'Nakuru', status: 'In Transit', eta: '2023-06-18' },
]

export const RecentShipments = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Shipments</CardTitle>
        <CardDescription>Latest cargo movements and their status</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Shipment ID</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>ETA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentShipments.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell>{shipment.id}</TableCell>
                <TableCell>{shipment.destination}</TableCell>
                <TableCell>
                  <Badge variant={shipment.status === 'Delivered' ? 'default' : 
                                  shipment.status === 'In Transit' ? 'outline' : 'secondary'}>
                    {shipment.status}
                  </Badge>
                </TableCell>
                <TableCell>{shipment.eta}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}