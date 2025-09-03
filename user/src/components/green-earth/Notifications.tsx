"use client";

import * as React from "react";
import { Bell } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";
import Link from 'next/link';

export function Notifications() {
  const { data } = useNotifications();
  const totalUnread = data?.totalUnread ?? 0;

  return (
    <Link
      href="/notifications"
      aria-label={`Notifications, ${totalUnread} unread`}
      className="relative p-2 rounded-full focus:outline-none focus:ring-0 transition-all duration-200 hover:scale-105 active:scale-95 active:opacity-70 text-white"
    >
      <Bell className="h-6 w-6" />
      {totalUnread > 0 && (
        <span className="absolute -top-0.5 -right-0.5 inline-grid place-items-center w-5 h-5 text-[10px] rounded-full bg-accent text-accent-foreground">
          {totalUnread > 99 ? "99+" : totalUnread}
        </span>
      )}
    </Link>
  );
}
