
"use client";

import * as React from "react";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import useUIState from "@/hooks/useUIState";

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
  const [activeItem, setActiveItem] = useUIState(state => [state.activeBottomNavItem, state.setActiveBottomNavItem]);
  
  React.useEffect(() => {
    // Find the best match for the current path. Profile sub-pages should still highlight "Profile".
    const currentTopLevelPath = "/" + (pathname.split('/')[1] || "");
    const currentItem = navItems.find(item => item.href === pathname || (item.href !== "/" && currentTopLevelPath.startsWith(item.href)));

    if (currentItem) {
      setActiveItem(currentItem.name);
    } else if (pathname === "/") {
      setActiveItem("Home");
    }
  }, [pathname, setActiveItem]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-20 md:hidden">
      <div className="flex justify-around items-center h-full">
        {navItems.map((item, index) => {
          const isActive = activeItem === item.name;
          return (
            <React.Fragment key={item.name}>
              <Link href={item.href} onClick={() => setActiveItem(item.name)} className="flex flex-col items-center justify-center h-full w-24 group">
                <Image
                  src={isActive ? item.activeIcon : item.inactiveIcon}
                  alt={item.name}
                  width={28}
                  height={28}
                  className="transition-transform duration-200 ease-in-out group-hover:scale-110"
                />
                <span className={cn(
                  "text-xs mt-1.5 font-semibold",
                  isActive ? "text-primary" : "text-gray-500"
                )}>
                  {item.name}
                </span>
              </Link>
              {index < navItems.length - 1 && (
                <div className="h-8 w-px bg-gray-200"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}
