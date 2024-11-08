'use client'

import React, { useState, useEffect } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from '@/hooks/use-toast'
import { Order, useOrderStore } from '@/lib/store/orderstore'


interface EditOrderFormProps {
  orderId?: string
}

export const EditOrderForm: React.FC<EditOrderFormProps> = ({ orderId }) => {
  const { recentOrders, addOrder, updateOrder, isLoading, error } = useOrderStore()
  const [order, setOrder] = useState<Omit<Order, 'id'>>({
    customer: '',
    total: '',
    status: '',
    date: ''
  })

  useEffect(() => {
    if (orderId) {
      const existingOrder = recentOrders.find(o => o.id === orderId)
      if (existingOrder) {
        setOrder(existingOrder)
      }
    }
  }, [orderId, recentOrders])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setOrder(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setOrder(prev => ({ ...prev, status: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (orderId) {
        await updateOrder(orderId, order)
        toast({ title: "Order updated successfully" })
      } else {
        await addOrder(order)
        toast({ title: "Order added successfully" })
      }
      // Reset form or redirect
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" })
    }
  }

  if (error) {
    toast({ title: "Error", description: error, variant: "destructive" })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{orderId ? 'Edit Order' : 'Add New Order'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="customer">Customer</Label>
            <Input id="customer" name="customer" value={order.customer} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="total">Total</Label>
            <Input id="total" name="total" value={order.total} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select name="status" value={order.status} onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input id="date" name="date" type="date" value={order.date} onChange={handleChange} required />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : (orderId ? 'Update Order' : 'Add Order')}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}