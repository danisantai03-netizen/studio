"use client";

import { Home, Map, User } from "lucide-react";
import useUIState from "@/hooks/useUIState";

const navItems = [
  { name: "Home", icon: Home, href: "#" },
  { name: "Maps", icon: Map, href: "#" },
  { name: "Profile", icon: User, href: "#" },
];

export function BottomNav() {
  const [activeItem, setActiveItem] = useUIState(state => [state.activeBottomNavItem, state.setActiveBottomNavItem]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t z-20 w-full">
      <div className="flex justify-around p-2">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={() => setActiveItem(item.name)}
            className={`flex flex-col items-center justify-center h-16 w-20 rounded-lg transition-colors focus:outline-none focus:ring-0
              ${activeItem === item.name
                ? "bg-secondary text-secondary-foreground"
                : "text-foreground/70 active:bg-accent/20"
              }`}
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs">{item.name}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
