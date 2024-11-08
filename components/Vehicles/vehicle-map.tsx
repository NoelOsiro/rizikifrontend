'use client'

import React, { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Vehicle {
    id: string;
    status: string;
    location: string;
    lat: number; 
    lng: number;
  }

  type Props = {
    selectedVehicle: Vehicle | null;
  }

  const UpdateMapCenter = ({ lat, lng, mapRef }: { lat: number; lng: number; mapRef: React.MutableRefObject<any> }) => {
    useEffect(() => {
      if (mapRef.current) {
        mapRef.current.setView([lat, lng], mapRef.current.getZoom())
      }
    }, [lat, lng, mapRef])
    return null
  }
export const VehicleMap = (props:Props) => {
  const defaultPosition: [number, number] = [0.5141, 35.2728] // Center of Kenya
  const mapRef = useRef<any>(null)

  return (
    <Card className="h-[500px]">
      <CardHeader>
        <CardTitle>Vehicle Location</CardTitle>
      </CardHeader>
      <CardDescription className='flex items-center justify-center font-bold text-xl'>
        {props.selectedVehicle ? `Tracking Shipment: ${props.selectedVehicle.id}` : "Select a shipment to view its location"}
      </CardDescription>
      <CardContent className="p-0">
        <MapContainer 
        key={props.selectedVehicle ? props.selectedVehicle.id : "default-map"} // Force remount if shipment changes
        center={props.selectedVehicle && props.selectedVehicle.lat !== undefined && props.selectedVehicle.lng !== undefined 
          ? [props.selectedVehicle.lat, props.selectedVehicle.lng] 
          : defaultPosition}
        zoom={16}
        >
          <TileLayer 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"  />
          {props.selectedVehicle && (
            <Marker position={[props.selectedVehicle.lat, props.selectedVehicle.lng]}>
              <Popup>
                <strong>Vehicle ID:</strong> {props.selectedVehicle.id}<br />
                <strong>Status:</strong> {props.selectedVehicle.status}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </CardContent>
    </Card>
  )
}