// src/components/SidebarDropdown.tsx
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarDropdownProps {
  label: string;
  icon: React.ElementType;
  items: { href: string; label: string; icon: React.ElementType }[];
}

export default function SidebarDropdown({ label, icon: Icon, items }: SidebarDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <Button
        variant="ghost"
        className="w-full justify-start text-foreground"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon className="mr-2 h-4 w-4" />
        {label}
        {isOpen ? <ChevronUp className="ml-auto h-4 w-4" /> : <ChevronDown className="ml-auto h-4 w-4" />}
      </Button>

      {isOpen && (
        <div className="ml-6 space-y-1">
          {items.map((item) => (
            <Button key={item.href} variant="ghost" asChild className="w-full justify-start text-foreground">
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
