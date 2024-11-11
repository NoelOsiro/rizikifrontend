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
  total: string // Total amount in string format, to be parsed into number
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

const CACHE_EXPIRATION_TIME = 10 * 60 * 1000 // 10 minutes

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
        const cachedOrders = localStorage.getItem('order-storage')
        const lastUpdatedTimestamp = localStorage.getItem('order-storage-timestamp')

        const now = new Date().getTime()

        // Freshness Check: Ensure data is not stale (within CACHE_EXPIRATION_TIME)
        if (
          cachedOrders &&
          lastUpdatedTimestamp &&
          now - Number(lastUpdatedTimestamp) < CACHE_EXPIRATION_TIME
        ) {
          // Use cached data if it's within the expiration time
          console.log('Using cached orders data')
          const orders = JSON.parse(cachedOrders)
          set({ recentOrders: orders, isLoading: false })
          updateOrderStats(orders) // Update order stats from cached data
          return
        }

        // If no data or it's expired, fetch from the API
        set({ isLoading: true, error: null })
        try {
          const response = await fetch('/api/orders')
          if (!response.ok) throw new Error('Failed to fetch orders')
          const data = await response.json()

          // Store new data and update the timestamp in localStorage
          localStorage.setItem('order-storage', JSON.stringify(data))
          localStorage.setItem('order-storage-timestamp', now.toString())

          set({ recentOrders: data, isLoading: false })
          updateOrderStats(data) // Update order stats after fetching new data
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
          updateOrderStats([...get().recentOrders, newOrder]) // Update stats with the new order
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
          updateOrderStats(get().recentOrders) // Update stats after order update
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
          updateOrderStats(get().recentOrders) // Update stats after order deletion
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

// Helper function to update orderStats
const updateOrderStats = (orders: Order[]) => {
  const totalOrders = orders.length
  const revenue = Array.isArray(orders) ? orders.reduce((sum, order) => sum + parseFloat(order.total), 0) : 0
  const avgOrderValue = totalOrders > 0 ? revenue / totalOrders : 0
  const pendingOrders = orders.filter((order) => order.status === 'pending').length

  // Update the store with the new stats
  useOrderStore.getState().setOrderStats({
    totalOrders,
    revenue,
    avgOrderValue,
    pendingOrders,
  })
}
