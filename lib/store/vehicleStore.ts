import { create } from 'zustand'



export interface Vehicle {
  id: string
  type: 'truck' | 'van' | 'car'
  licensePlate: string
  capacity: number
  status: 'available' | 'in-transit' | 'maintenance'
  location: string
  currentLocation: { lat: number; lng: number }
}


const vehicles: Vehicle[] = [
    {
        id: 'V001', type: 'truck', licensePlate: 'KAA123A', capacity: 1000, status: 'in-transit', currentLocation: { lat: -1.286389, lng: 36.817223 },
        location: 'Nairobi'
    },
    {
        id: 'V002', type: 'van', licensePlate: 'KBB456B', capacity: 500, status: 'available', currentLocation: { lat: -4.043477, lng: 39.668206 },
        location: 'Kisumu'
    },
    {
        id: 'V003', type: 'car', licensePlate: 'KCC789C', capacity: 300, status: 'in-transit', currentLocation: { lat: -0.091702, lng: 34.767956 },
        location: 'Mombasa'
    },
    {
        id: 'V004', type: 'truck', licensePlate: 'KDD012D', capacity: 1200, status: 'maintenance', currentLocation: { lat: -0.303099, lng: 36.080025 },
        location: 'Kilifi'
    },
  ]

interface VehicleStore {
  vehicles: Vehicle[]
  addVehicle: (vehicle: Vehicle) => void
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void
  removeVehicle: (id: string) => void
  getVehicle: (id: string) => Vehicle | undefined
}

export const useVehicleStore = create<VehicleStore>((set, get) => ({
  vehicles: vehicles,
  addVehicle: (vehicle) => set((state) => ({ vehicles: [...state.vehicles, vehicle] })),
  updateVehicle: (id, updates) => set((state) => ({
    vehicles: state.vehicles.map((vehicle) => 
      vehicle.id === id ? { ...vehicle, ...updates } : vehicle
    )
  })),
  removeVehicle: (id) => set((state) => ({
    vehicles: state.vehicles.filter((vehicle) => vehicle.id !== id)
  })),
  getVehicle: (id) => get().vehicles.find((vehicle) => vehicle.id === id),
}))