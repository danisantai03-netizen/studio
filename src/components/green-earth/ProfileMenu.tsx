
import React from "react";
import { ChevronRight } from 'lucide-react';

export type MenuItem = {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  onClick: () => void;
};

type Props = { menus: MenuItem[] };

const MemoizedProfileMenu: React.FC<Props> = ({ menus }) => {
  return (
    <div className="mt-6">
      <div className="bg-card rounded-lg shadow-sm divide-y divide-border">
        {menus.map((m) => (
          <button
            key={m.id}
            onClick={m.onClick}
            className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-white/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/40 active:scale-[0.99] transition-all duration-150"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-md">{m.icon}</div>
              <div>
                <div className="text-sm font-semibold text-foreground">{m.title}</div>
                {m.subtitle && (
                  <div className="text-xs text-muted-foreground">{m.subtitle}</div>
                )}
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
};

export const ProfileMenu = React.memo(MemoizedProfileMenu);
