import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Shipment, useShipmentStore } from '@/lib/store/shipmentstore';
// Import the Zustand store

interface ShipmentSearchProps {
  onSelect: (shipment: Shipment) => void;
}

export const ShipmentSearch: React.FC<ShipmentSearchProps> = ({ onSelect }) => {
  const getShipment = useShipmentStore((state) => state.getShipment) // Get the `getShipment` function from the store

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const shipmentId = (e.target as HTMLFormElement).shipmentId.value
    const shipment = getShipment(shipmentId) // Fetch shipment from the store

    if (shipment) {
      onSelect(shipment) // If shipment is found, pass it to `onSelect`
    } else {
      alert('Shipment not found') // Handle case where shipment is not found
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Shipment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input name="shipmentId" placeholder="Enter Shipment ID" />
          <Button type="submit">Search</Button>
        </form>
      </CardContent>
    </Card>
  )
}
