import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

const shipments: Shipment[] = [
  { id: 'SH001', status: 'In Transit', destination: 'Nairobi', lat: -1.286389, lng: 36.817223 },
  { id: 'SH002', status: 'Delivered', destination: 'Mombasa', lat: -4.043477, lng: 39.668206 },
  { id: 'SH003', status: 'Processing', destination: 'Kisumu', lat: -0.091702, lng: 34.768024 },
  { id: 'SH004', status: 'In Transit', destination: 'Nakuru', lat: -0.303099, lng: 36.080025 },
]

interface Shipment {
    id: string;
    lat: number;
    lng: number;
    status: string;
    destination: string;
    }

interface ShipmentListProps {
  onSelect: (shipment: Shipment) => void;
}

export const ShipmentList: React.FC<ShipmentListProps> = ({ onSelect }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipment List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Shipment ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipments.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell>{shipment.id}</TableCell>
                <TableCell>{shipment.status}</TableCell>
                <TableCell>{shipment.destination}</TableCell>
                <TableCell>
                  <Button onClick={() => onSelect(shipment)}>Track</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}