import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { Session } from 'next-auth'
import { signIn, signOut } from '@/auth'
import React from 'react'


interface AppState {
  session: Session | null
  theme: 'light' | 'dark'
  setSession: (session: Session | null) => void
  setTheme: (theme: 'light' | 'dark') => void
  login: () => Promise<void>
  logout: () => Promise<void>
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      session: null,
      theme: 'light',
      setSession: (session) => set({ session }),
      setTheme: (theme) => set({ theme }),
      login: async () => {
        await signIn('supabase') // replace 'supabase' with your Next-Auth provider if different
      },
      logout: async () => {
        await signOut()
        set({ session: null })
      },
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export function useAuthSync(session: Session | null) {
  const setSession = useAppStore((state) => state.setSession)

  React.useEffect(() => {
    setSession(session)
  }, [session, setSession])
}