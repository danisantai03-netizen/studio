"use client";

import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export interface NotificationItem {
  id: string;
  title: string;
  body?: string;
  createdAt: string; // ISO8601
  read: boolean;
  icon?: string;
  href?: string;
}

export interface GetNotificationsResponse {
  data: NotificationItem[];
  totalUnread: number;
}

const queryClient = new QueryClient();

export function AppProviders({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

// --- API fetcher functions ---

async function fetchNotifications(): Promise<GetNotificationsResponse> {
  const res = await fetch('/api/notifications');
  if (!res.ok) {
    throw new Error('Failed to fetch notifications');
  }
  return res.json();
}

async function markNotificationAsRead(ids: string[]): Promise<{ success: true; updatedIds: string[] }> {
  const res = await fetch('/api/notifications/mark-read', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  });
  if (!res.ok) {
    throw new Error('Failed to mark notification as read');
  }
  return res.json();
}

async function markAllNotificationsAsRead(): Promise<{ success: true }> {
    const res = await fetch('/api/notifications/mark-all-read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    if (!res.ok) {
      throw new Error('Failed to mark all as read');
    }
    return res.json();
}


// --- React Query Hook ---

export function useNotifications() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery<GetNotificationsResponse>({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    staleTime: 30_000, // 30 seconds
    refetchOnWindowFocus: true,
  });

  const markOneAsRead = useMutation({
    mutationFn: (id: string) => markNotificationAsRead([id]),
    onMutate: async (idToUpdate: string) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['notifications'] });
      // Snapshot the previous value
      const previousNotifications = queryClient.getQueryData<GetNotificationsResponse>(['notifications']);
      // Optimistically update to the new value
      if (previousNotifications) {
        const newData = previousNotifications.data.map(n => 
            n.id === idToUpdate ? { ...n, read: true } : n
        );
        const newTotalUnread = newData.filter(n => !n.read).length;
        queryClient.setQueryData<GetNotificationsResponse>(['notifications'], { data: newData, totalUnread: newTotalUnread });
      }
      return { previousNotifications };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousNotifications) {
        queryClient.setQueryData(['notifications'], context.previousNotifications);
      }
    },
    onSettled: () => {
      // Invalidate to re-sync with server
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const markAllAsRead = useMutation({
    mutationFn: markAllNotificationsAsRead,
    onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ['notifications'] });
        const previousNotifications = queryClient.getQueryData<GetNotificationsResponse>(['notifications']);
        if (previousNotifications) {
            const newData = previousNotifications.data.map(n => ({ ...n, read: true }));
            queryClient.setQueryData<GetNotificationsResponse>(['notifications'], { data: newData, totalUnread: 0 });
        }
        return { previousNotifications };
    },
    onError: (err, variables, context) => {
        if (context?.previousNotifications) {
            queryClient.setQueryData(['notifications'], context.previousNotifications);
        }
    },
    onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    markOneAsRead,
    markAllAsRead,
  };
}
