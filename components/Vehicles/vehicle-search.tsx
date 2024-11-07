import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Vehicle {
  id: string;
  status: string;
  location: string;
  lat?: number; 
  lng?: number;
}

interface VehicleSearchProps {
  onSelect: (vehicle: Vehicle) => void;
}

export const VehicleSearch: React.FC<VehicleSearchProps> = ({ onSelect }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const vehicleId = (e.target as HTMLFormElement).vehicleId.value
    // In a real application, you would fetch the vehicle data here
    onSelect({ id: vehicleId, lat: 0.5141, lng: 35.2728, status: 'In Transit', location: 'Unknown' })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Vehicle</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input name="vehicleId" placeholder="Enter Vehicle ID" />
          <Button type="submit">Search</Button>
        </form>
      </CardContent>
    </Card>
  )
}