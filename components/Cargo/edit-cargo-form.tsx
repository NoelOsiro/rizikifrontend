'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCargoStore } from '@/lib/store/cargoStore'
import { toast } from '@/hooks/use-toast'

interface EditCargoFormProps {
  cargoId?: string
}

export const EditCargoForm: React.FC<EditCargoFormProps> = ({ cargoId }) => {
  const { getCargoItem, addCargoItem, updateCargoItem, isLoading, error } = useCargoStore()
  const [cargo, setCargo] = useState<{
    name: string;
    weight: number;
    type: string;
    status: 'in-stock' | 'in-transit' | 'delivered';
    month: string;
  }>({
    name: '',
    weight: 0,
    type: '',
    status: 'in-stock',
    month: ''
  })

  useEffect(() => {
    if (cargoId) {
      const existingCargo = getCargoItem(cargoId)
      if (existingCargo) {
        setCargo(existingCargo)
      }
    }
  }, [cargoId, getCargoItem])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCargo(prev => ({ ...prev, [name]: name === 'weight' ? parseFloat(value) : value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setCargo(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (cargoId) {
        await updateCargoItem(cargoId, cargo)
        toast({ title: "Cargo updated successfully" })
      } else {
        await addCargoItem(cargo)
        toast({ title: "Cargo added successfully" })
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
        <CardTitle>{cargoId ? 'Edit Cargo' : 'Add New Cargo'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={cargo.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input id="weight" name="weight" type="number" value={cargo.weight} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Select name="type" value={cargo.type} onValueChange={(value) => handleSelectChange('type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select cargo type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wheat">Wheat</SelectItem>
                <SelectItem value="maize">Maize</SelectItem>
                <SelectItem value="rice">Rice</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select name="status" value={cargo.status} onValueChange={(value) => handleSelectChange('status', value as 'in-stock' | 'in-transit' | 'delivered')}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="month">Month</Label>
            <Input id="month" name="month" value={cargo.month} onChange={handleChange} required />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : (cargoId ? 'Update Cargo' : 'Add Cargo')}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}