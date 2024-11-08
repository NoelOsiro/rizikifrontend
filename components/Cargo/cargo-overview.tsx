"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck, Clock, CheckCircle } from 'lucide-react'
import { useCargoStore } from '@/lib/store/cargoStore'

export const CargoOverview = () => {
  const cargoItems = useCargoStore((state) => state.cargoItems)

  // Calculate metrics based on cargo status
  const totalCargo = cargoItems.length
  const inTransit = cargoItems.filter(item => item.status === 'in-transit').length
  const pending = cargoItems.filter(item => item.status === 'in-stock').length
  const delivered = cargoItems.filter(item => item.status === 'delivered').length

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cargo Overview</CardTitle>
        <CardDescription>Key metrics for cargo management</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center space-x-4">
            <Package className="h-6 w-6 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Total Cargo</p>
              <p className="text-2xl font-bold">{totalCargo}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Truck className="h-6 w-6 text-green-500" />
            <div>
              <p className="text-sm font-medium">In Transit</p>
              <p className="text-2xl font-bold">{inTransit}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Clock className="h-6 w-6 text-yellow-500" />
            <div>
              <p className="text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold">{pending}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <div>
              <p className="text-sm font-medium">Delivered</p>
              <p className="text-2xl font-bold">{delivered}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
