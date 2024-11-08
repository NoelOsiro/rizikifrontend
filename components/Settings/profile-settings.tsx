'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppStore } from "@/lib/store/userStore"

export const ProfileSettings = () => {
  const { user, setUser } = useAppStore()
  const [name, setName] = useState(user?.user_metadata.name || '')
  const [email, setEmail] = useState(user?.email || '')

  const handleSave = () => {
    if (user) {
      setUser({ 
        ...user, 
        user_metadata: { ...user.user_metadata, name }, 
        email: email, 
        id: user.id || '', 
        app_metadata: user.app_metadata || {} 
      })
    }
    // In a real application, you would also send this data to your backend
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>Manage your profile information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.user_metadata?.image || "/placeholder.svg"} alt="Profile picture" />
            <AvatarFallback>{user?.email?.charAt(0) ?? ''}</AvatarFallback>
          </Avatar>
          <Button>Change Avatar</Button>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="John Doe" 
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="john.doe@example.com" 
          />
        </div>
        <Button className="w-full" onClick={handleSave}>Save Changes</Button>
      </CardContent>
    </Card>
  )
}