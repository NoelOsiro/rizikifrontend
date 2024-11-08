// orderStore.ts
import { create } from 'zustand'

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

interface Order {
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
  setOrderStats: (stats: OrderStats) => void
  setOrderStatus: (status: OrderStatus) => void
  setOrderTrends: (trends: OrderTrend[]) => void
  setRecentOrders: (orders: Order[]) => void
}

export const useOrderStore = create<OrderStore>((set) => ({
  orderStats: {
    totalOrders: 1234,
    revenue: 45678,
    avgOrderValue: 37.01,
    pendingOrders: 23,
  },
  orderStatus: {
    completed: 400,
    processing: 300,
    pending: 200,
    cancelled: 100,
  },
  orderTrends: [
    { name: 'Jan', orders: 400, revenue: 24000 },
    { name: 'Feb', orders: 300, revenue: 18000 },
    { name: 'Mar', orders: 200, revenue: 12000 },
    { name: 'Apr', orders: 278, revenue: 16680 },
    { name: 'May', orders: 189, revenue: 11340 },
    { name: 'Jun', orders: 239, revenue: 14340 },
    { name: 'Jul', orders: 349, revenue: 20940 },
  ],
  recentOrders: [
    { id: 'ORD001', customer: 'John Doe', total: '$156.00', status: 'Completed', date: '2023-06-15' },
    { id: 'ORD002', customer: 'Jane Smith', total: '$89.50', status: 'Processing', date: '2023-06-14' },
    { id: 'ORD003', customer: 'Bob Johnson', total: '$210.75', status: 'Pending', date: '2023-06-13' },
    { id: 'ORD004', customer: 'Alice Brown', total: '$45.25', status: 'Completed', date: '2023-06-12' },
  ],
  setOrderStats: (stats) => set({ orderStats: stats }),
  setOrderStatus: (status) => set({ orderStatus: status }),
  setOrderTrends: (trends) => set({ orderTrends: trends }),
  setRecentOrders: (orders) => set({ recentOrders: orders }),
}))
