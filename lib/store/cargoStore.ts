import { create } from 'zustand'

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
  addCargoItem: (item: CargoItem) => void
  updateCargoItem: (id: string, updates: Partial<CargoItem>) => void
  removeCargoItem: (id: string) => void
  getCargoItem: (id: string) => CargoItem | undefined
  getMonthlyTrends: () => Record<string, Record<string, number>>
}

export const useCargoStore = create<CargoStore>((set, get) => ({
    cargoItems: [
        { id: '1', name: 'Wheat', weight: 4000, type: 'wheat', status: 'in-stock', month: 'Jan' },
        { id: '2', name: 'Maize', weight: 2400, type: 'maize', status: 'in-transit', month: 'Jan' },
        { id: '3', name: 'Rice', weight: 2400, type: 'rice', status: 'delivered', month: 'Jan' },

      ],
  addCargoItem: (item) => set((state) => ({ cargoItems: [...state.cargoItems, item] })),
  updateCargoItem: (id, updates) => set((state) => ({
    cargoItems: state.cargoItems.map((item) => 
      item.id === id ? { ...item, ...updates } : item
    )
  })),
  removeCargoItem: (id) => set((state) => ({
    cargoItems: state.cargoItems.filter((item) => item.id !== id)
  })),
  getCargoItem: (id) => get().cargoItems.find((item) => item.id === id),
  getMonthlyTrends: () => {
    const trends = {} as Record<string, Record<string, number>>
    const { cargoItems } = useCargoStore.getState()

    cargoItems.forEach(({ month, type, weight }) => {
      if (!trends[month]) trends[month] = {}
      trends[month][type] = (trends[month][type] || 0) + weight
    })
    
    return trends
  },
}))