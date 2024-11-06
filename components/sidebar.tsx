"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Home, Package, Truck, Settings, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = usePathname();

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/cargo", label: "Cargo", icon: Package },
    { href: "/orders", label: "Orders", icon: Presentation },
    { href: "/tracking", label: "Tracking", icon: Truck },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden p-4 text-gray-600 flex w-20 h-20 justify-center items-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-muted p-4 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-64`}
      >
        {/* Header */}
        <div className="mb-6 text-center text-lg font-semibold text-dark">
          Riziki Flour Millers
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = router === item.href;

            return (
              <Button
                key={item.href}
                variant="ghost"
                className={`w-full justify-start ${
                  isActive ? "bg-green-400 text-foreground" : "text-foreground"
                }`}
                asChild
                onClick={() => setIsOpen(false)}
              >
                <Link href={item.href}>
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
