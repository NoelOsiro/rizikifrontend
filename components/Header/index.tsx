import { Bell, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'

export function Header() {
  return (
    <header className="border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold">Riziki Flour Millers</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8 w-[200px] lg:w-[300px]" />
          </div>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}