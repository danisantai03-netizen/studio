
"use client";

import * as React from "react";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Home, Map, User, ScanLine } from "lucide-react";

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Maps",
    href: "/maps",
    icon: Map,
  },
  {
    name: "Scan",
    href: "/scan",
    icon: ScanLine,
    isCentral: true,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
];

export function BottomNav() {
  const pathname = usePathname();

  const getActiveItem = () => {
    if (pathname === '/') return 'Home';
    if (pathname.startsWith('/profile')) return 'Profile';
    if (pathname.startsWith('/maps')) return 'Maps';
    if (pathname.startsWith('/scan')) return 'Scan';
    return 'Home';
  }

  const activeItem = getActiveItem();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-20 md:hidden">
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => {
          const isActive = activeItem === item.name;
          const Icon = item.icon;

          if (item.isCentral) {
            return (
              <Link href={item.href} key={item.name} className="-mt-6">
                <div className="relative flex items-center justify-center w-16 h-16 bg-primary rounded-full shadow-lg text-white">
                  <Icon className="w-8 h-8" />
                </div>
              </Link>
            )
          }

          return (
            <Link href={item.href} key={item.name} className="flex flex-col items-center justify-center h-full w-20 group">
                <Icon className={cn("w-6 h-6 transition-colors duration-200", isActive ? "text-primary" : "text-gray-400")} />
              <span className={cn(
                "text-xs mt-1 font-semibold transition-colors duration-200",
                isActive ? "text-primary" : "text-gray-500"
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
