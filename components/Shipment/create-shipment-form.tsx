'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useShipmentStore } from '@/lib/store/shipmentstore'
import { useVehicleStore } from '@/lib/store/vehicleStore'
import { useOrderStore } from '@/lib/store/orderstore'

export const CreateShipmentForm: React.FC = () => {
  const { addShipment } = useShipmentStore()
  const { vehicles } = useVehicleStore()
  const { recentOrders } = useOrderStore()
  const [shipment, setShipment] = useState({
    id: '',
    cargoIds: [],
    origin: '',
    destination: '',
    status: 'pending' as const,
    estimatedDelivery: new Date(),
    vehicleId: '',
    orderId: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShipment(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setShipment(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newShipment = {
      ...shipment,
      id: Date.now().toString(),
      cargoIds: [shipment.orderId], // Assuming one order corresponds to one cargo item
      estimatedDelivery: new Date(shipment.estimatedDelivery),
      lat: 0, // You might want to set this based on the origin
      lng: 0, // You might want to set this based on the origin
    }
    addShipment(newShipment)
    // Reset form or redirect
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Shipment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="origin">Origin</Label>
            <Input id="origin" name="origin" value={shipment.origin} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="destination">Destination</Label>
            <Input id="destination" name="destination" value={shipment.destination} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
            <Input id="estimatedDelivery" name="estimatedDelivery" type="date" value={shipment.estimatedDelivery.toISOString().split('T')[0]} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="vehicleId">Vehicle</Label>
            <Select name="vehicleId" value={shipment.vehicleId} onValueChange={(value) => handleSelectChange('vehicleId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select vehicle" />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map(vehicle => (
                  <SelectItem key={vehicle.id} value={vehicle.id}>{vehicle.licensePlate} - {vehicle.type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="orderId">Order</Label>
            <Select name="orderId" value={shipment.orderId} onValueChange={(value) => handleSelectChange('orderId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select order" />
              </SelectTrigger>
              <SelectContent>
                {recentOrders.map(order => (
                  <SelectItem key={order.id} value={order.id}>{order.id} - {order.customer}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Create Shipment</Button>
        </form>
      </CardContent>
    </Card>
  )
}