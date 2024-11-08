"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useShipmentStore } from "@/lib/store/shipmentstore"
 // Adjust path to your store file

export const RecentShipments = () => {
  // Fetch shipments from the store
  const shipments = useShipmentStore((state) => state.shipments)

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
            {shipments.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell>{shipment.id}</TableCell>
                <TableCell>{shipment.destination}</TableCell>
                <TableCell>
                  <Badge variant={
                    shipment.status === 'delivered' ? 'default' :
                    shipment.status === 'in-transit' ? 'outline' : 'secondary'
                  }>
                    {shipment.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(shipment.estimatedDelivery).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
