'use client'

import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Shipment {
  id: string;
  lat: number;
  lng: number;
  status: string;
  destination: string;
}

export const ShipmentMap = ({ selectedShipment }: { selectedShipment: Shipment }) => {
  const defaultPosition = [0.5141, 35.2728] // Center of Kenya

  return (
    <Card className="h-[500px]">
      <CardHeader>
        <CardTitle>Shipment Location</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <MapContainer>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {selectedShipment && (
            <Marker position={[selectedShipment.lat, selectedShipment.lng]}>
              <Popup>
                Shipment ID: {selectedShipment.id}<br />
                Status: {selectedShipment.status}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </CardContent>
    </Card>
  )
}