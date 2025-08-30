
"use client";

import * as React from "react";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "Home",
    href: "/",
    activeIcon: "/assets/bottomNav/home-active.svg",
    inactiveIcon: "/assets/bottomNav/home-inactive.svg",
  },
  {
    name: "Maps",
    href: "#", // Placeholder
    activeIcon: "/assets/bottomNav/maps-active.svg",
    inactiveIcon: "/assets/bottomNav/maps-inactive.svg",
  },
  {
    name: "Profile",
    href: "#", // Placeholder
    activeIcon: "/assets/bottomNav/profile-active.svg",
    inactiveIcon: "/assets/bottomNav/profile-inactive.svg",
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-20 md:hidden">
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link href={item.href} key={item.name} className="flex flex-col items-center justify-center h-full w-24 group">
              <Image
                src={isActive ? item.activeIcon : item.inactiveIcon}
                alt={item.name}
                width={28}
                height={28}
                className="transition-transform duration-200 ease-in-out group-hover:scale-110"
              />
              <span className={cn(
                "text-xs mt-1 font-medium",
                isActive ? "text-primary" : "text-gray-400"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
