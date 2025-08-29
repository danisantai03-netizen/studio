
"use client";

import * as React from "react";
import { Home, Map, Bell, User, Plus } from "lucide-react";
import useUIState from "@/hooks/useUIState";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", icon: Home },
  { name: "Maps", icon: Map },
  { name: "Notifications", icon: Bell },
  { name: "Profile", icon: User },
];

const NavIcon = ({
  item,
  isActive,
  onClick,
}: {
  item: { name: string; icon: React.ElementType };
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center h-16 w-16 transition-all duration-200 ease-in-out focus:outline-none focus:ring-0 group",
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
);

const NavBackground = () => (
  <svg
    className="absolute bottom-0 left-0 right-0 w-full h-[88px] text-white"
    viewBox="0 0 375 88"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <path
      d="M0 24C0 10.7452 10.7452 0 24 0H147.5C154.538 0 161.161 3.03656 165.923 8.16987C171.859 14.4922 179.962 18 188.5 18C197.038 18 205.141 14.4922 211.077 8.16987C215.839 3.03656 222.462 0 229.5 0H351C364.255 0 375 10.7452 375 24V88H0V24Z"
      fill="currentColor"
    />
  </svg>
);

export function BottomNav() {
  const [activeItem, setActiveItem] = useUIState((state) => [
    state.activeBottomNavItem,
    state.setActiveBottomNavItem,
  ]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[88px] z-20">
      <div className="relative w-full h-full">
        {/* Background with Notch */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[88px]"
          style={{ filter: "drop-shadow(0 -4px 12px rgba(0,0,0,0.05))" }}
        >
          <NavBackground />
        </div>

        {/* FAB */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <button className="grid place-items-center w-16 h-16 bg-primary rounded-full shadow-lg transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50">
            <Plus className="w-8 h-8 text-white" />
          </button>
        </div>

        {/* Navigation Icons */}
        <div className="absolute inset-0 flex justify-around items-center pt-2">
          <div className="flex justify-center items-center gap-4">
            <NavIcon
              item={navItems[0]}
              isActive={activeItem === navItems[0].name}
              onClick={() => setActiveItem(navItems[0].name)}
            />
            <NavIcon
              item={navItems[1]}
              isActive={activeItem === navItems[1].name}
              onClick={() => setActiveItem(navItems[1].name)}
            />
          </div>
          <div className="w-20" /> {/* Spacer for FAB */}
          <div className="flex justify-center items-center gap-4">
            <NavIcon
              item={navItems[2]}
              isActive={activeItem === navItems[2].name}
              onClick={() => setActiveItem(navItems[2].name)}
            />
            <NavIcon
              item={navItems[3]}
              isActive={activeItem === navItems[3].name}
              onClick={() => setActiveItem(navItems[3].name)}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
