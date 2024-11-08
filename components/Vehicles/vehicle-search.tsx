"use client";
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useVehicleStore, Vehicle } from '@/lib/store/vehicleStore';
 // Adjust path as necessary

interface VehicleSearchProps {
  onSelect: (vehicle: Vehicle) => void;
}

export const VehicleSearch: React.FC<VehicleSearchProps> = ({ onSelect }) => {
  const getVehicle = useVehicleStore((state) => state.getVehicle)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const vehicleId = (e.target as HTMLFormElement).vehicleId.value
    const vehicle = getVehicle(vehicleId)

    if (vehicle) {
      onSelect(vehicle)
    } else {
      alert(`Vehicle with ID ${vehicleId} not found`)
    }
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
