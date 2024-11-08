// src/components/Sidebar.tsx
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Home, Package, Truck, Settings, Presentation, FileText } from "lucide-react";
import { SidebarItem } from "@/components/Sidebar/SidebarItem";
import SidebarDropdown from "./SidebarDropdown";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/cargo", label: "Cargo", icon: Package },
    { href: "/orders", label: "Orders", icon: Presentation },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  const trackingItems = [
    { href: "/tracking/shipment", label: "Shipment", icon: FileText },
    { href: "/tracking/vehicles", label: "Vehicles", icon: Truck },
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
          {navItems.map((item) => (
            <SidebarItem key={item.href} href={item.href} label={item.label} icon={item.icon} />
          ))}
          <SidebarDropdown label="Tracking" icon={Truck} items={trackingItems} />
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
