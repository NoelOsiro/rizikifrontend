import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface CargoItem {
  id: string
  name: string
  weight: number
  type: string
  status: 'in-stock' | 'in-transit' | 'delivered'
  month: string
}

interface CargoStore {
  cargoItems: CargoItem[]
  isLoading: boolean
  error: string | null
  fetchCargoItems: () => Promise<void>
  addCargoItem: (item: Omit<CargoItem, 'id'>) => Promise<void>
  updateCargoItem: (id: string, updates: Partial<CargoItem>) => Promise<void>
  removeCargoItem: (id: string) => Promise<void>
  getCargoItem: (id: string) => CargoItem | undefined
  getMonthlyTrends: () => Record<string, Record<string, number>>
}

const CACHE_EXPIRATION_TIME = 10 * 60 * 1000 // 10 minutes

export const useCargoStore = create<CargoStore>()(
  persist(
    (set, get) => ({
      cargoItems: [], // Initialize with empty array
      isLoading: false,
      error: null,
      fetchCargoItems: async () => {
        const cachedCargoItems = get().cargoItems
        const lastUpdatedTimestamp = localStorage.getItem('cargo-storage-timestamp')

        const now = new Date().getTime()

        // Check if cargoItems are already in the store
        // If they exist and the cache is not expired, use them
        if (cachedCargoItems.length > 0 && lastUpdatedTimestamp && now - Number(lastUpdatedTimestamp) < CACHE_EXPIRATION_TIME) {
          console.log('Using cached cargo items')
          return
        }

        // Fetch new data if cached data is not available or expired
        set({ isLoading: true, error: null })
        try {
          const response = await fetch('/api/cargo')
          if (!response.ok) throw new Error('Failed to fetch cargo items')
          const data = await response.json()

          // Store the fresh data in Zustand and localStorage
          set({ cargoItems: data, isLoading: false })

          // Update the timestamp in localStorage to reflect the current time
          localStorage.setItem('cargo-storage-timestamp', now.toString())
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
        }
      },
      addCargoItem: async (item) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch('/api/cargo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
          })
          if (!response.ok) throw new Error('Failed to add cargo item')
          const newItem = await response.json()
          set(state => ({ cargoItems: [...state.cargoItems, newItem], isLoading: false }))
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
        }
      },
      updateCargoItem: async (id, updates) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch(`/api/cargo/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates),
          })
          if (!response.ok) throw new Error('Failed to update cargo item')
          const updatedItem = await response.json()
          set(state => ({
            cargoItems: state.cargoItems.map(item => item.id === id ? updatedItem : item),
            isLoading: false
          }))
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
        }
      },
      removeCargoItem: async (id) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch(`/api/cargo/${id}`, { method: 'DELETE' })
          if (!response.ok) throw new Error('Failed to remove cargo item')
          set(state => ({
            cargoItems: state.cargoItems.filter(item => item.id !== id),
            isLoading: false
          }))
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
        }
      },
      getCargoItem: (id) => get().cargoItems.find(item => item.id === id),
      getMonthlyTrends: () => {
        const trends = {} as Record<string, Record<string, number>>
        
        // Safeguard to ensure cargoItems is an array
        const cargoItems = get().cargoItems
        if (Array.isArray(cargoItems)) {
          cargoItems.forEach(({ month, type, weight }) => {
            if (!trends[month]) trends[month] = {}
            trends[month][type] = (trends[month][type] || 0) + weight
          })
        }
        return trends
      },
    }),
    {
      name: 'cargo-storage', // Persisted key
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
    }
  )
)
