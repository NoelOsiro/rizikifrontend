import { create } from 'zustand'

export interface Shipment {
  id: string
  cargoIds: string[]
  origin: string
  destination: string
  status: 'pending' | 'in-transit' | 'delivered'
  estimatedDelivery: Date
  lat: number
  lng: number
  vehicleId: string
}

interface ShipmentStore {
  shipments: Shipment[]
  addShipment: (shipment: Shipment) => void
  updateShipment: (id: string, updates: Partial<Shipment>) => void
  removeShipment: (id: string) => void
  activeShipments: () => Shipment[]
  getShipment: (id: string) => Shipment | undefined
}

export const useShipmentStore = create<ShipmentStore>((set, get) => ({
  shipments: [],
  addShipment: (shipment) => set((state) => ({ shipments: [...state.shipments, shipment] })),
  updateShipment: (id, updates) => set((state) => ({
    shipments: state.shipments.map((shipment) => 
      shipment.id === id ? { ...shipment, ...updates } : shipment
    )
  })),
  removeShipment: (id) => set((state) => ({
    shipments: state.shipments.filter((shipment) => shipment.id !== id)
  })),
  activeShipments: () => get().shipments.filter((shipment) => shipment.status === 'in-transit' || shipment.status === 'pending'),
  getShipment: (id) => get().shipments.find((shipment) => shipment.id === id),
}))