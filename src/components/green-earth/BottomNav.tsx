import { Home, Map, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", icon: Home, href: "#", active: true },
  { name: "Maps", icon: Map, href: "#", active: false },
  { name: "Profile", icon: User, href: "#", active: false },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t z-20 w-full">
      <div className="flex justify-around p-2">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center h-16 w-20 rounded-lg transition-colors
              ${item.active
                ? "bg-secondary text-secondary-foreground"
                : "text-foreground/70 hover:bg-accent/50 active:bg-accent/70"
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
