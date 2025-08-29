
"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import type { NotificationItem } from "@/hooks/use-notifications";
import { useNotifications } from "@/hooks/use-notifications";
import { cn } from "@/lib/utils";

export default function NotificationsPage() {
  const {
    data,
    isLoading,
    isError,
    markOneAsRead,
    markAllAsRead,
  } = useNotifications();

  const handleNotificationClick = (notification: NotificationItem) => {
    if (!notification.read) {
      markOneAsRead.mutate(notification.id);
    }
  };

  const notifications = data?.data ?? [];
  const totalUnread = data?.totalUnread ?? 0;

  return (
    <div className="bg-background min-h-screen">
      <div className="p-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-2xl font-bold mb-4"
          aria-label="Go back to home"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Notification</span>
        </Link>
        <div className="flex justify-end mb-4">
          <Button
            variant="link"
            size="sm"
            className="text-accent h-auto p-0"
            onClick={() => markAllAsRead.mutate()}
            disabled={totalUnread === 0}
          >
            Mark all as read
          </Button>
        </div>
      </div>

      <main className="px-4">
        <div className="space-y-3">
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
      </main>
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
      <div className={cn(
        "flex items-start gap-4 p-4 rounded-2xl transition-all duration-150 cursor-pointer hover:shadow-md active:scale-[0.98]",
        notification.read ? "bg-white" : "bg-primary/5 border border-primary/20"
      )}>
        <div className={cn(
          "w-10 h-10 rounded-full grid place-items-center shrink-0 mt-1",
          notification.read ? "bg-gray-100" : "bg-primary/10"
        )}>
          <Check className={cn("w-5 h-5", notification.read ? "text-gray-500" : "text-primary")} />
        </div>
        <div className="flex-grow">
          <p className={cn("text-sm", !notification.read && "font-semibold")}>
            {notification.title}
          </p>
          {notification.body && (
            <p className="text-xs text-muted-foreground mt-0.5 font-normal">{notification.body}</p>
          )}
          <div className="text-xs text-muted-foreground/80 mt-1.5 flex items-center gap-1.5 font-normal">
            <Clock className="w-3 h-3" />
            <span>{formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}</span>
          </div>
        </div>
        {!notification.read && (
          <div className="w-2.5 h-2.5 rounded-full bg-accent mt-1 shrink-0 self-center" aria-label="Unread"></div>
        )}
      </div>
  );

  const commonProps = {
    onClick: () => onClick(notification),
    onKeyDown: (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') onClick(notification)},
  };

  return notification.href ? (
    <Link href={notification.href} {...commonProps} role="menuitem" tabIndex={0}>
        {content}
    </Link>
  ) : (
    <div {...commonProps} role="menuitem" tabIndex={0}>
      {content}
    </div>
  );
}

function NotificationSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white animate-pulse">
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
