'use client'

import React, { useState } from 'react'
import { ShipmentMap } from '@/components/Shipment/shipment-map'
import { ShipmentList } from '@/components/Shipment/shipment-list'
import { ShipmentSearch } from '@/components/Shipment/shipment-search'

interface Shipment {
    id: string;
    lat: number;
    lng: number;
    status: string;
    destination: string;
    }

const ShipmentPage = () => {
  const [selectedShipment, setSelectedShipment] = useState<Shipment|null>(null)

  const handleSelectShipment = (shipment:Shipment) => {
    setSelectedShipment(shipment)
  }

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Shipment Tracking</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <ShipmentSearch onSelect={handleSelectShipment} />
          <ShipmentList onSelect={handleSelectShipment} />
        </div>
        {selectedShipment && <ShipmentMap selectedShipment={selectedShipment} />}
      </div>
    </main>
  )
}

export default ShipmentPage