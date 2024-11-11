import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { Session } from 'next-auth'

interface AppState {
  session: Session | null
  theme: 'light' | 'dark'
  setSession: (session: Session | null) => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      session: null,
      theme: 'light',
      setSession: (session) => set({ session }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
