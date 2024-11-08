import { User } from '@supabase/supabase-js'
import { create } from 'zustand'


interface AppState {
  user: User | null
  isAuthenticated: boolean
  theme: 'light' | 'dark'
  setUser: (user: User | null) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
  setTheme: (theme: 'light' | 'dark') => void
  logout: () => void
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  theme: 'light',
  setUser: (user) => set({ user }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setTheme: (theme) => set({ theme }),
  logout: () => set({ user: null, isAuthenticated: false }),
}))