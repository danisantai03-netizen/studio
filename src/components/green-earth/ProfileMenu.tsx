
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

type Props = { menus: MenuItem[] };

const MemoizedProfileMenu: React.FC<Props> = ({ menus }) => {
  return (
    <ul className="divide-y divide-border border rounded-xl overflow-hidden bg-card">
      {menus.map((m) => (
        <li key={m.id}>
          <Link
            href={m.href}
            className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/40 active:scale-[0.99] transition-all duration-150"
            role="menuitem"
          >
            <div className="flex items-center gap-3">
              <div className="grid place-items-center w-8 h-8 bg-primary/10 rounded-lg">{m.icon}</div>
              <div>
                <div className="text-sm font-semibold text-foreground">{m.title}</div>
                {m.subtitle && (
                  <div className="text-xs text-muted-foreground">{m.subtitle}</div>
                )}
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const ProfileMenu = React.memo(MemoizedProfileMenu);
