// src/components/SidebarItem.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  href: string;
  label: string;
  icon: React.ElementType;
}

export function SidebarItem({ href, label, icon: Icon }: SidebarItemProps) {
  const router = usePathname();
  const isActive = router === href;

  return (
    <Button
      variant="ghost"
      className={`w-full justify-start ${isActive ? "bg-green-400 text-foreground" : "text-foreground"}`}
      asChild
    >
      <Link href={href}>
        <Icon className="mr-2 h-4 w-4" />
        {label}
      </Link>
    </Button>
  );
}
