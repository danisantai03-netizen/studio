
import React from "react";
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type MenuItem = {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  href: string;
};

type Props = { menu: MenuItem };

export const ProfileMenu: React.FC<Props> = ({ menu }) => {
  return (
    <li className="border-t">
      <Link
        href={menu.href}
        className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/40 active:scale-[0.99] transition-all duration-150 rounded-lg"
        role="menuitem"
      >
        <div className="flex items-center gap-3">
          <div className="grid place-items-center w-8 h-8">{menu.icon}</div>
          <div>
            <div className="text-sm font-semibold text-foreground">{menu.title}</div>
            {menu.subtitle && (
              <div className="text-xs text-muted-foreground">{menu.subtitle}</div>
            )}
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </Link>
    </li>
  );
};
