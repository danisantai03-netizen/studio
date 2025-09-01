
"use client";

import React from "react";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Home, Map, User } from "lucide-react";

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
    name: "Profile",
    href: "/profile",
    icon: User,
  },
];

export function BottomNav() {
  const pathname = usePathname();

  const getActiveItem = () => {
    if (pathname === '/') return 'Home';
    if (pathname.startsWith('/maps')) return 'Maps';
    if (pathname.startsWith('/profile')) return 'Profile';
    return 'Home';
  }

  const activeItem = getActiveItem();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50">
      <div className="flex justify-around items-center h-full max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = activeItem === item.name;
          const Icon = item.icon;

          return (
            <Link href={item.href} key={item.name} className="flex flex-col items-center justify-center h-full w-20 group text-center py-2" prefetch={true}>
                <Icon className={cn("w-5 h-5 transition-colors duration-200 sm:w-6 sm:h-6", isActive ? "text-primary" : "text-muted-foreground")} />
              <span className={cn(
                "text-xs mt-1 font-medium transition-colors duration-200 sm:text-sm",
                isActive ? "text-primary" : "text-muted-foreground"
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
