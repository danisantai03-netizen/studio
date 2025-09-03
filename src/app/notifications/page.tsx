
"use client";

import * as React from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import type { NotificationItem } from "@/features/notifications/types";
import { useNotifications, useMarkNotificationAsRead, useMarkAllNotificationsAsRead } from "@/features/notifications/hooks/useNotifications";
import { cn } from "@/lib/utils";
import { UniversalHeader } from "@/components/green-earth/UniversalHeader";

export default function NotificationsPage() {
  const { data, isLoading, isError } = useNotifications();
  const markOneAsReadMutation = useMarkNotificationAsRead();
  const markAllAsReadMutation = useMarkAllNotificationsAsRead();

  const handleNotificationClick = (notification: NotificationItem) => {
    if (!notification.read) {
      markOneAsReadMutation.mutate(notification.id);
    }
  };
  
  const handleMarkAllRead = () => {
    if (data?.totalUnread && data.totalUnread > 0) {
      markAllAsReadMutation.mutate();
    }
  };

  const notifications = data?.data ?? [];
  const totalUnread = data?.totalUnread ?? 0;

  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Notifications">
        <Button
          variant="link"
          size="sm"
          className="text-primary h-auto p-0 text-xs absolute right-4"
          onClick={handleMarkAllRead}
          disabled={totalUnread === 0 || markAllAsReadMutation.isPending}
        >
          Mark all as read
        </Button>
      </UniversalHeader>

      <main className="px-4 pt-4">
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
              <div key={item.id} className="mb-3">
                <NotificationCard
                  notification={item}
                  onClick={handleNotificationClick}
                />
              </div>
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
        "flex items-start gap-3 p-3 rounded-xl transition-all duration-150 cursor-pointer active:scale-[0.98]",
        notification.read ? "bg-card" : "bg-primary/5 border border-primary/20"
      )}>
        <div className={cn(
          "w-10 h-10 rounded-full grid place-items-center shrink-0 mt-1",
          notification.read ? "bg-gray-100 dark:bg-gray-800" : "bg-primary/10"
        )}>
          {/* Using a generic check icon for simplicity */}
          <svg className={cn("w-5 h-5", notification.read ? "text-gray-500" : "text-primary")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex-grow pt-1">
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
          <div className="w-2 h-2.5 rounded-full bg-primary mt-1 shrink-0 self-center" aria-label="Unread"></div>
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
        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-card animate-pulse">
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
