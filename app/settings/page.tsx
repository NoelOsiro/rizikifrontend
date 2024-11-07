'use client'

import React from 'react'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from '@/components/Settings/profile-settings'
import { NotificationSettings } from '@/components/Settings/notification-settings'
import { SystemSettings } from '@/components/Settings/system-settings'

const SettingsPage = () => {
  return (
    <DefaultLayout>
      <main className="flex-1 overflow-y-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Settings</h2>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
          <TabsContent value="system">
            <SystemSettings />
          </TabsContent>
        </Tabs>
      </main>
    </DefaultLayout>
  )
}

export default SettingsPage