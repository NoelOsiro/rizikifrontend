"use client";
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, DollarSign, TrendingUp, Clock } from 'lucide-react'
import { useOrderStore } from '@/lib/store/orderstore';


export const OrderOverview = () => {
  const { orderStats } = useOrderStore()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Overview</CardTitle>
        <CardDescription>Key metrics for order management</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center space-x-4">
            <ShoppingCart className="h-6 w-6 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Total Orders</p>
              <p className="text-2xl font-bold">{orderStats.totalOrders}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <DollarSign className="h-6 w-6 text-green-500" />
            <div>
              <p className="text-sm font-medium">Revenue</p>
              <p className="text-2xl font-bold">${orderStats.revenue}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <TrendingUp className="h-6 w-6 text-yellow-500" />
            <div>
              <p className="text-sm font-medium">Avg. Order Value</p>
              <p className="text-2xl font-bold">${orderStats.avgOrderValue}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Clock className="h-6 w-6 text-red-500" />
            <div>
              <p className="text-sm font-medium">Pending Orders</p>
              <p className="text-2xl font-bold">{orderStats.pendingOrders}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
