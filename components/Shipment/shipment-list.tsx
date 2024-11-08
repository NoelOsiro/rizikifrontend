"use client";
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Shipment, useShipmentStore } from '@/lib/store/shipmentstore';
 // Make sure to adjust the path

interface ShipmentListProps {
  onSelect: (shipment: Shipment) => void;
}

export const ShipmentList: React.FC<ShipmentListProps> = ({ onSelect }) => {
  // Fetch shipments from the Zustand store
  const shipments = useShipmentStore((state) => state.shipments)

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
