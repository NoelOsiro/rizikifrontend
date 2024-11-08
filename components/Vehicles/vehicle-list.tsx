import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

const vehicles = [
  { id: 'V001', status: 'In Transit', location: 'Nairobi', lat: -1.286389, lng: 36.817223 },
  { id: 'V002', status: 'Idle', location: 'Mombasa', lat: -4.043477, lng: 39.668206 },
  { id: 'V003', status: 'In Transit', location: 'Kisumu', lat: -0.091702, lng: 34.767956 },
  { id: 'V004', status: 'Maintenance', location: 'Nakuru', lat: -0.303099, lng: 36.080025 },
]

interface Vehicle {
  id: string;
  status: string;
  location: string;
}

interface VehicleListProps {
  onSelect: (vehicle: Vehicle) => void;
}

export const VehicleList: React.FC<VehicleListProps> = ({ onSelect }) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Vehicle List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.id}</TableCell>
                <TableCell>{vehicle.status}</TableCell>
                <TableCell>{vehicle.location}</TableCell>
                <TableCell>
                  <Button onClick={() => onSelect(vehicle)}>Track</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}