"use client";

import * as React from "react";
import { Bell, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import type { NotificationItem } from "@/hooks/use-notifications";
import { useNotifications } from "@/hooks/use-notifications";
import { cn } from "@/lib/utils";
import Link from 'next/link';

export function Notifications() {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const {
    data,
    isLoading,
    isError,
    markOneAsRead,
    markAllAsRead,
  } = useNotifications();

  // Close on escape key
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = (notification: NotificationItem) => {
    if (!notification.read) {
      markOneAsRead.mutate(notification.id);
    }
    setIsOpen(false);
  };

  const totalUnread = data?.totalUnread ?? 0;
  const notifications = data?.data ?? [];

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Notifications, ${totalUnread} unread`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="relative p-2 rounded-full focus:outline-none focus:ring-0 transition-all duration-200 hover:scale-105 active:scale-95 active:opacity-70"
      >
        <Bell className="h-6 w-6" />
        {totalUnread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 inline-grid place-items-center w-5 h-5 text-[10px] rounded-full bg-accent text-accent-foreground">
            {totalUnread > 99 ? "99+" : totalUnread}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          className="absolute right-0 mt-2 w-[min(92vw,360px)] max-h-[60vh] overflow-y-auto rounded-xl bg-white shadow-lg p-2 transform origin-top-right transition-all duration-150 ease-out data-[state=open]:scale-100 data-[state=open]:opacity-100 data-[state=closed]:scale-95 data-[state=closed]:opacity-0"
          data-state={isOpen ? 'open' : 'closed'}
        >
          <div className="flex justify-between items-center px-2 py-1">
            <h3 className="text-base font-semibold">Notifications</h3>
            <Button
              variant="link"
              size="sm"
              className="text-accent h-auto p-0"
              onClick={() => markAllAsRead.mutate()}
              disabled={totalUnread === 0}
            >
              Mark all read
            </Button>
          </div>

          <div className="mt-2">
            {isLoading ? (
              <NotificationSkeleton />
            ) : isError ? (
              <div className="text-center text-sm text-muted-foreground py-8">
                Could not load notifications.
              </div>
            ) : notifications.length === 0 ? (
              <div className="text-center text-sm text-muted-foreground py-8">
                No new notifications.
              </div>
            ) : (
              notifications.map((item) => (
                <NotificationCard
                  key={item.id}
                  notification={item}
                  onClick={handleNotificationClick}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationCard({
  notification,
  onClick,
}: {
  notification: NotificationItem;
  onClick: (notification: NotificationItem) => void;
}) {
  const content = (
      <div
        role="menuitem"
        tabIndex={-1}
        onClick={() => onClick(notification)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(notification)}}
        className={cn(
          "flex items-start gap-3 p-3 rounded-lg transition-all duration-150 cursor-pointer hover:shadow-sm hover:bg-gray-50/50",
          !notification.read && "font-semibold"
        )}
      >
        <div className="w-10 h-10 rounded-full bg-primary/10 grid place-items-center shrink-0 mt-1">
          <Check className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-grow">
          <p className="text-sm">{notification.title}</p>
          {notification.body && (
            <p className="text-xs text-muted-foreground mt-0.5 font-normal">{notification.body}</p>
          )}
          <div className="text-xs text-muted-foreground/80 mt-1.5 flex items-center gap-1.5 font-normal">
            <Clock className="w-3 h-3" />
            <span>{formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}</span>
          </div>
        </div>
        {!notification.read && (
          <div className="w-2 h-2 rounded-full bg-accent mt-1 shrink-0" aria-label="Unread"></div>
        )}
      </div>
  );

  return notification.href ? (
    <Link href={notification.href} passHref legacyBehavior>
        {content}
    </Link>
  ) : (
    content
  );
}

function NotificationSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-start gap-3 p-3 animate-pulse">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex-grow space-y-2 mt-1">
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-3 w-3/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
