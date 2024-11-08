// src/pages/ShipmentPage.tsx
'use client'

import React, { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { ShipmentList } from '@/components/Shipment/shipment-list'
import { ShipmentSearch } from '@/components/Shipment/shipment-search'
import { Shipment } from '@/lib/store/shipmentstore'
import { CreateShipmentForm } from './create-shipment-form'

const ShipmentPage = () => {
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null)

  const handleSelectShipment = (shipment: Shipment) => {
    setSelectedShipment(shipment)
  }

  const ShipmentMap = useMemo(
    () =>
      dynamic(() => import('@/components/Shipment/shipment-map'), {
        loading: () => <p>Loading map...</p>,
        ssr: false,
      }),
    []
  )

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Shipment Tracking</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
        {/* ShipmentSearch and ShipmentList on first row */}
        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <ShipmentSearch onSelect={handleSelectShipment} />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <ShipmentList onSelect={handleSelectShipment} />
        </div>

        {/* ShipmentMap takes up the whole row */}
        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <ShipmentMap selectedShipment={selectedShipment} />
        </div>
        {/* ShipmentMap takes up the whole row */}
        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <CreateShipmentForm />
        </div>
      </div>
    </main>
  )
}

export default ShipmentPage
