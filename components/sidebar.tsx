import { Home, Package, Truck, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Sidebar() {
  return (
    <aside className="bg-muted w-64 min-h-screen p-4 hidden md:block">
      <nav className="space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          <Home className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Package className="mr-2 h-4 w-4" />
          Cargo
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Truck className="mr-2 h-4 w-4" />
          Tracking
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </nav>
    </aside>
  )
}