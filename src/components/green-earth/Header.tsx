
"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from 'lucide-react';
import Link from "next/link";
import { useNotifications } from "@/hooks/use-notifications";

export function Header() {
  const { data } = useNotifications();
  const totalUnread = data?.totalUnread ?? 0;

  return (
    <header className="relative bg-background p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
              <AvatarImage
                src="httpshttps://picsum.photos/48/48"
                alt="Alex Green"
                data-ai-hint="profile person"
              />
              <AvatarFallback>AG</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">Welcome back,</p>
              <h1 className="text-lg font-bold text-foreground">Alex Green</h1>
            </div>
          </div>
          <Link
            href="/notifications"
            aria-label={`Notifications, ${totalUnread} unread`}
            className="relative p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-ring"
            >
            <Bell className="h-6 w-6 text-gray-500" />
            {totalUnread > 0 && (
              <span className="absolute top-1 right-1 inline-grid place-items-center w-4 h-4 text-[10px] rounded-full bg-accent text-accent-foreground">
                {totalUnread > 9 ? "9+" : totalUnread}
              </span>
            )}
        </Link>
        </div>
    </header>
  );
}
