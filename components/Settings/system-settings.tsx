import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store/userStore"

export const SystemSettings = () => {
  const { theme, setTheme } = useAppStore()

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
        <CardDescription>Manage system-wide settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="language">Language</Label>
          <Select>
            <SelectTrigger id="language">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="timezone">Timezone</Label>
          <Select>
            <SelectTrigger id="timezone">
              <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="utc">UTC</SelectItem>
              <SelectItem value="est">Eastern Time</SelectItem>
              <SelectItem value="cst">Central Time</SelectItem>
              <SelectItem value="pst">Pacific Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="dark-mode">Dark Mode</Label>
          <Switch 
            id="dark-mode" 
            checked={theme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="analytics">Enable Analytics</Label>
          <Switch id="analytics" />
        </div>
        <Button className="w-full">Save System Settings</Button>
      </CardContent>
    </Card>
  )
}