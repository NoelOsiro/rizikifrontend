import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface ShipmentSearchProps {
  onSelect: (shipment: { id: string, lat: number, lng: number, status: string,destination: string; }) => void;
}

export const ShipmentSearch: React.FC<ShipmentSearchProps> = ({ onSelect }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const shipmentId = (e.target as HTMLFormElement).shipmentId.value
    // In a real application, you would fetch the shipment data here
    onSelect({
      id: shipmentId, lat: 0.5141, lng: 35.2728, status: 'In Transit',
      destination: 'Kilifi'
    })
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