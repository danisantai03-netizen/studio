
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
    href: "/profile",
    activeIcon: "/assets/bottomNav/profile-active.svg",
    inactiveIcon: "/assets/bottomNav/profile-inactive.svg",
  },
];

export function BottomNav() {
  const pathname = usePathname();

  const getActiveItem = () => {
    // Exact match for home page
    if (pathname === '/') return 'Home';
    // Match for profile and its sub-pages
    if (pathname.startsWith('/profile')) return 'Profile';
    // Match for maps
    if (pathname.startsWith('/maps')) return 'Maps';
    // Default to home if no match
    return 'Home';
  }

  const activeItem = getActiveItem();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-auto bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-20 md:hidden py-2">
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => {
          const isActive = activeItem === item.name;
          return (
            <Link href={item.href} key={item.name} className="flex flex-col items-center justify-center h-full w-24 group">
              <Image
                src={isActive ? item.activeIcon : item.inactiveIcon}
                alt={item.name}
                width={24}
                height={24}
                className="transition-transform duration-200 ease-in-out group-hover:scale-110 h-6 w-6 sm:h-7 sm:w-7"
              />
              <span className={cn(
                "text-xs mt-1 font-semibold",
                isActive ? "text-primary" : "text-gray-500",
                "sm:text-sm"
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
