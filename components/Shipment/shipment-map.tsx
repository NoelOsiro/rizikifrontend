'use client'

import React, { useRef, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shipment } from '@/lib/store/shipmentstore'



type Props = {
  selectedShipment: Shipment | null;
}

const UpdateMapCenter = ({ lat, lng, mapRef }: { lat: number; lng: number; mapRef: React.MutableRefObject<any> }) => {
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([lat, lng], mapRef.current.getZoom())
    }
  }, [lat, lng, mapRef])
  return null
}

const ShipmentMap = ({ selectedShipment }: Props) => {
  const defaultPosition: [number, number] = [0.5141, 35.2728] // Center of Kenya
  const mapRef = useRef<any>(null)

  return (
    <Card className="h-[600px]">
      <CardHeader>
        <CardTitle>Shipment Location</CardTitle>
      </CardHeader>
      <CardDescription className='flex items-center justify-center font-bold text-xl'>
        {selectedShipment ? `Tracking Shipment: ${selectedShipment.id}` : "Select a shipment to view its location"}
      </CardDescription>
      <CardContent className="p-0">
        <MapContainer
          key={selectedShipment ? selectedShipment.id : "default-map"} // Force remount if shipment changes
          center={selectedShipment ? [selectedShipment.lat, selectedShipment.lng] : defaultPosition}
          zoom={16}
        >
          <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {selectedShipment && (
            <>
              <Marker position={[selectedShipment.lat, selectedShipment.lng]}>
                <Popup>
                  <strong>Shipment ID:</strong> {selectedShipment.id}<br />
                  <strong>Status:</strong> {selectedShipment.status}
                </Popup>
              </Marker>
              <UpdateMapCenter lat={selectedShipment.lat} lng={selectedShipment.lng} mapRef={mapRef} />
            </>
          )}
        </MapContainer>
      </CardContent>
    </Card>
  )
}

export default ShipmentMap
