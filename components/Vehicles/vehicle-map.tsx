'use client'

import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Vehicle {
    id: string;
    status: string;
    location: string;
    lat?: number; 
    lng?: number;
  }

export const VehicleMap = ({ selectedVehicle }: { selectedVehicle: Vehicle | null }) => {
  const defaultPosition = [0.5141, 35.2728] // Center of Kenya

  return (
    <Card className="h-[500px]">
      <CardHeader>
        <CardTitle>Vehicle Location</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <MapContainer >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {selectedVehicle && (
            <Marker position={[selectedVehicle.lat, selectedVehicle.lng]}>
              <Popup>
                Vehicle ID: {selectedVehicle.id}<br />
                Status: {selectedVehicle.status}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </CardContent>
    </Card>
  )
}