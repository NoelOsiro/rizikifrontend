import { Bell, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import DeployButton from './deploy-button'
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import HeaderAuth from './header-auth'


export function Header() {
    return (
        <header className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                    <div className="flex gap-5 items-center text-2xl font-bold">
                        <Link href={"/"}>Riziki Flour Millers</Link>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search..." className="pl-8 w-[200px] lg:w-[300px]" />
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" aria-label="Notifications">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <HeaderAuth />
                </div>
            </nav>
        </header>
    )
}