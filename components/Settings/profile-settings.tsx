'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "next-auth/react"
import { useAppStore } from '@/lib/store/userStore'
import { toast } from '@/hooks/use-toast'

export const ProfileSettings = () => {
  const { data: session, update } = useSession()
  const { setSession } = useAppStore()
  const [name, setName] = useState(session?.user?.name || '')
  const [email, setEmail] = useState(session?.user?.email || '')

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '')
      setEmail(session.user.email || '')
    }
  }, [session])

  const handleSave = async () => {
    try {
      const updatedSession = await update({
        ...session,
        user: {
          ...session?.user,
          name,
          email,
        }
      })
      
      if (updatedSession) {
        setSession(updatedSession)
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated.",
        })
      }
    } catch (error) {
      console.error('Failed to update profile:', error)
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAvatarChange = () => {
    // Implement avatar change functionality
    toast({
      title: "Not implemented",
      description: "Avatar change functionality is not yet implemented.",
    })
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
            <AvatarImage src={session?.user?.image || "/placeholder.svg"} alt="Profile picture" />
            <AvatarFallback>{session?.user?.name?.charAt(0) ?? session?.user?.email?.charAt(0) ?? ''}</AvatarFallback>
          </Avatar>
          <Button onClick={handleAvatarChange}>Change Avatar</Button>
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