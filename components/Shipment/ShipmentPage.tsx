import React from 'react'
import { CargoOverview } from '@/components/Cargo/cargo-overview'
import { CargoDistribution } from '@/components/Cargo/cargo-distribution'
import { RecentShipments } from '@/components/Cargo/RecentShipments'
import { CargoTrends } from '@/components/Cargo/cargo-trends'

const ShipmentPage = () => {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Shipment Management</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <CargoOverview />
        <CargoDistribution />
      </div>
      <div className="mt-6">
        <RecentShipments />
      </div>
      <div className="mt-6">
        <CargoTrends />
      </div>
    </main>
  )
}

export default ShipmentPage