
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Bell, Moon, Sun } from 'lucide-react';
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import { useDarkMode } from "@/hooks/useDarkMode";
import { Button } from "@/components/ui/button";
import { useUser } from "@/features/user/hooks/useUser";
import { Skeleton } from "../ui/skeleton";

export function Header() {
  const { data: notifications } = useNotifications();
  const { data: user } = useUser();
  const totalUnread = notifications?.totalUnread ?? 0;

  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="relative bg-background pt-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
             <Link href="/profile" className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-card shadow-sm">
                {!user ? (
                     <Skeleton className="h-full w-full" />
                ) : (
                    <Image
                        src={user.avatarUrl}
                        alt={user.name}
                        fill
                        className="object-cover"
                        data-ai-hint="profile person"
                        priority
                      />
                )}
            </Link>
            <div>
              {!user ? (
                  <div className="space-y-1">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-5 w-24" />
                  </div>
              ) : (
                <>
                  <p className="text-xs text-muted-foreground">Welcome back,</p>
                  <h1 className="text-base font-bold text-foreground">{user.name}</h1>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            {isMounted && (
                 <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={toggleDarkMode}
                    aria-label="Toggle theme"
                >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
            )}
            <Link
              href="/notifications"
              aria-label={`Notifications, ${isMounted ? totalUnread : 0} unread`}
              className="relative p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-ring"
              >
              <Bell className="h-6 w-6 text-gray-500" />
              {isMounted && totalUnread > 0 && (
                <span className="absolute top-1 right-1 inline-grid place-items-center w-4 h-4 text-[10px] rounded-full bg-accent text-accent-foreground">
                  {totalUnread > 9 ? "9+" : totalUnread}
                </span>
              )}
            </Link>
          </div>
        </div>
    </header>
  );
}
