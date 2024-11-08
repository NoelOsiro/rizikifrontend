import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface OrderStats {
  totalOrders: number
  revenue: number
  avgOrderValue: number
  pendingOrders: number
}

interface OrderStatus {
  completed: number
  processing: number
  pending: number
  cancelled: number
}

interface OrderTrend {
  name: string
  orders: number
  revenue: number
}

export interface Order {
  id: string
  customer: string
  total: string
  status: string
  date: string
}

interface OrderStore {
  orderStats: OrderStats
  orderStatus: OrderStatus
  orderTrends: OrderTrend[]
  recentOrders: Order[]
  isLoading: boolean
  error: string | null
  fetchOrders: () => Promise<void>
  addOrder: (order: Omit<Order, 'id'>) => Promise<void>
  updateOrder: (id: string, updates: Partial<Order>) => Promise<void>
  deleteOrder: (id: string) => Promise<void>
  setOrderStats: (stats: OrderStats) => void
  setOrderStatus: (status: OrderStatus) => void
  setOrderTrends: (trends: OrderTrend[]) => void
  setRecentOrders: (orders: Order[]) => void
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orderStats: {
        totalOrders: 0,
        revenue: 0,
        avgOrderValue: 0,
        pendingOrders: 0,
      },
      orderStatus: {
        completed: 0,
        processing: 0,
        pending: 0,
        cancelled: 0,
      },
      orderTrends: [],
      recentOrders: [],
      isLoading: false,
      error: null,
      fetchOrders: async () => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch('/api/orders')
          if (!response.ok) throw new Error('Failed to fetch orders')
          const data = await response.json()
          set({ recentOrders: data, isLoading: false })
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
        }
      },
      addOrder: async (order) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order),
          })
          if (!response.ok) throw new Error('Failed to add order')
          const newOrder = await response.json()
          set(state => ({
            recentOrders: [...state.recentOrders, newOrder],
            isLoading: false
          }))
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
        }
      },
      updateOrder: async (id, updates) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch(`/api/orders/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates),
          })
          if (!response.ok) throw new Error('Failed to update order')
          const updatedOrder = await response.json()
          set(state => ({
            recentOrders: state.recentOrders.map(order => 
              order.id === id ? updatedOrder : order
            ),
            isLoading: false
          }))
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
        }
      },
      deleteOrder: async (id) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch(`/api/orders/${id}`, {
            method: 'DELETE',
          })
          if (!response.ok) throw new Error('Failed to delete order')
          set(state => ({
            recentOrders: state.recentOrders.filter(order => order.id !== id),
            isLoading: false
          }))
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
        }
      },
      setOrderStats: (stats) => set({ orderStats: stats }),
      setOrderStatus: (status) => set({ orderStatus: status }),
      setOrderTrends: (trends) => set({ orderTrends: trends }),
      setRecentOrders: (orders) => set({ recentOrders: orders }),
    }),
    {
      name: 'order-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)