'use client'

import React, { useState } from 'react'
import { VehicleMap } from '@/components/Vehicles/vehicle-map'
import { VehicleList } from '@/components/Vehicles/vehicle-list'
import { VehicleSearch } from '@/components/Vehicles/vehicle-search'
interface Vehicle {
  id: string;
  status: string;
  location: string;
  lat?: number; 
  lng?: number;
}

const VehiclesPage = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle|null>(null)

  const handleSelect = (vehicle:Vehicle) => {
    setSelectedVehicle(vehicle)
  }

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Vehicle Tracking</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <VehicleSearch onSelect={handleSelect} />
          <VehicleList onSelect={handleSelect} />
        </div>
        <VehicleMap selectedVehicle={selectedVehicle} />
      </div>
    </main>
  )
}

export default VehiclesPage