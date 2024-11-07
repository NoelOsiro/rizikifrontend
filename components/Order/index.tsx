import React from 'react'
import { OrderOverview } from '@/components/Order/order-overview'
import { RecentOrders } from '@/components/Order/recent-orders'
import { OrderStatusDistribution } from '@/components/Order/order-status-distribution'
import { OrderTrends } from '@/components/Order/order-trends'

const OrderPage = () => {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Orders Management</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <OrderOverview />
        <OrderStatusDistribution />
      </div>
      <div className="mt-6">
        <RecentOrders />
      </div>
      <div className="mt-6">
        <OrderTrends />
      </div>
    </main>
  )
}

export default OrderPage