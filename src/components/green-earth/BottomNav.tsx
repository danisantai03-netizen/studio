
"use client";

import * as React from "react";
import useUIState from "@/hooks/useUIState";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

// In a real application, this configuration would be fetched from a remote source
// like Firebase Remote Config, a CMS, or a dedicated API endpoint.
const navConfig = {
  items: [
    { 
      name: "Home", 
      href: "/", 
      icon: "https://storage.googleapis.com/stc-dev-assets-259114/static/home-inactive.png",
      activeIcon: "https://storage.googleapis.com/stc-dev-assets-259114/static/home-active.png",
      fallback: "/icons/home.svg"
    },
    { 
      name: "Maps", 
      href: "#",
      icon: "https://storage.googleapis.com/stc-dev-assets-259114/static/maps-inactive.png",
      activeIcon: "https://storage.googleapis.com/stc-dev-assets-259114/static/maps-active.png",
      fallback: "/icons/maps.svg"
    },
    { 
      name: "Profile", 
      href: "#",
      icon: "https://storage.googleapis.com/stc-dev-assets-259114/static/profile-inactive.png",
      activeIcon: "https://storage.googleapis.com/stc-dev-assets-259114/static/profile-active.png",
      fallback: "/icons/profile.svg"
    },
  ],
};

type NavItem = typeof navConfig.items[0];

const NavIcon = ({
  item,
  isActive,
  onClick,
}: {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}) => {
  const [hasError, setHasError] = React.useState(false);
  const iconUrl = isActive ? item.activeIcon : item.icon;

  return (
    <Link href={item.href} passHref>
      <button
        onClick={onClick}
        className="flex flex-col items-center justify-center h-14 w-20 transition-all duration-200 ease-in-out focus:outline-none focus:ring-0 group"
        aria-label={item.name}
      >
        <div className="relative w-6 h-6 mb-0.5">
          <Image
            src={hasError ? item.fallback : iconUrl}
            alt={`${item.name} icon`}
            fill
            className="object-contain transition-transform duration-200 ease-in-out group-hover:scale-110"
            onError={() => setHasError(true)}
            unoptimized // Necessary for SVGs from remote URLs, if applicable
          />
        </div>
        <span className={cn("text-xs font-medium", isActive ? "text-primary" : "text-gray-500")}>
          {item.name}
        </span>
      </button>
    </Link>
  );
};

export function BottomNav() {
  const [activeItem, setActiveItem] = useUIState((state) => [
    state.activeBottomNavItem,
    state.setActiveBottomNavItem,
  ]);
  
  // In a real app, you would use React.useEffect and a fetch call to get navConfig
  // For this example, we use the statically defined config.
  const { items } = navConfig;

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-20">
      <div className="flex justify-around items-center h-full">
        {items.map((item) => (
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
