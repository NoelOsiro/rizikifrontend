import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

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
  isLoading: boolean
  error: string | null
  fetchShipments: () => Promise<void>
  addShipment: (shipment: Shipment) => void
  updateShipment: (id: string, updates: Partial<Shipment>) => void
  removeShipment: (id: string) => void
  activeShipments: () => Shipment[]
  getShipment: (id: string) => Shipment | undefined
}

const CACHE_EXPIRATION_TIME = 10 * 60 * 1000 // 10 minutes

export const useShipmentStore = create<ShipmentStore>()(
  persist(
    (set, get) => ({
      shipments: [],
      isLoading: false,
      error: null,
      fetchShipments: async () => {
        const cachedShipments = localStorage.getItem('shipment-storage')
        const lastUpdatedTimestamp = localStorage.getItem('shipment-storage-timestamp')

        const now = new Date().getTime()

        // Freshness Check: Ensure data is not stale (within CACHE_EXPIRATION_TIME)
        if (
          cachedShipments &&
          lastUpdatedTimestamp &&
          now - Number(lastUpdatedTimestamp) < CACHE_EXPIRATION_TIME
        ) {
          // Use cached data if it's within the expiration time
          console.log('Using cached shipments data')
          set({ shipments: JSON.parse(cachedShipments), isLoading: false })
          return
        }

        // If no data or it's expired, fetch from the API
        set({ isLoading: true, error: null })
        try {
          const response = await fetch('/api/shipment')  // Replace with your Supabase endpoint if needed
          if (!response.ok) throw new Error('Failed to fetch shipments')
          const data = await response.json()

          // Store new data and update the timestamp in localStorage
          localStorage.setItem('shipment-storage', JSON.stringify(data))
          localStorage.setItem('shipment-storage-timestamp', now.toString())

          set({ shipments: data, isLoading: false })
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
        }
      },
      addShipment: (shipment) => {
        set((state) => {
          // Avoid adding duplicates by checking if the shipment already exists
          const isShipmentExist = state.shipments.some((existingShipment) => existingShipment.id === shipment.id)
          if (isShipmentExist) return state // No change if shipment already exists
          return { shipments: [...state.shipments, shipment] }
        })
      },
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
    }),
    {
      name: 'shipment-storage', // Name of the storage key in localStorage
      storage: createJSONStorage(() => localStorage), // Store state in localStorage
    }
  )
)
