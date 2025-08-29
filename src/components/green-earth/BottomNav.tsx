
"use client";

import * as React from "react";
import { Home, Map, User } from "lucide-react";
import useUIState from "@/hooks/useUIState";
import { cn } from "@/lib/utils";
import Link from "next/link";

const navItems = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Maps", icon: Map, href: "#" },
  { name: "Profile", icon: User, href: "#" },
];

const NavIcon = ({
  item,
  isActive,
  onClick,
}: {
  item: { name: string; icon: React.ElementType; href: string };
  isActive: boolean;
  onClick: () => void;
}) => (
  <Link href={item.href} passHref>
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center h-16 w-20 transition-all duration-200 ease-in-out focus:outline-none focus:ring-0 group",
        isActive ? "text-primary" : "text-gray-400"
      )}
      aria-label={item.name}
    >
      <item.icon
        className={cn(
          "w-6 h-6 mb-1 transition-transform duration-200 ease-in-out",
          isActive ? "scale-110" : "group-hover:scale-110"
        )}
      />
      <span
        className={cn(
          "text-xs font-medium transition-all duration-200 ease-in-out",
          isActive
            ? "opacity-100 font-bold"
            : "opacity-0 group-hover:opacity-100"
        )}
      >
        {item.name}
      </span>
    </button>
  </Link>
);

export function BottomNav() {
  const [activeItem, setActiveItem] = useUIState((state) => [
    state.activeBottomNavItem,
    state.setActiveBottomNavItem,
  ]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-20">
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => (
          <NavIcon
            key={item.name}
            item={item}
            isActive={activeItem === item.name}
            onClick={() => setActiveItem(item.name)}
          />
        ))}
      </div>
    </nav>
  );
}
