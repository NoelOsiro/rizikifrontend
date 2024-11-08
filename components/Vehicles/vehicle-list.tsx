"use client";
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useVehicleStore, Vehicle } from '@/lib/store/vehicleStore'


interface VehicleListProps {
  onSelect: (vehicle: Vehicle) => void;
}

export const VehicleList: React.FC<VehicleListProps> = ({ onSelect }) => {
  const { vehicles} = useVehicleStore()
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