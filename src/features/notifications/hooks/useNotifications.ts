
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead } from "@/features/notifications/services/notificationService";
import type { GetNotificationsResponse } from "@/features/notifications/types";

export function useNotifications() {
  return useQuery<GetNotificationsResponse>({
    queryKey: ['notifications'],
    queryFn: getNotifications,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => markNotificationAsRead([id]),
    onMutate: async (idToUpdate: string) => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });
      const previousNotifications = queryClient.getQueryData<GetNotificationsResponse>(['notifications']);
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
      if (context?.previousNotifications) {
        queryClient.setQueryData(['notifications'], context.previousNotifications);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
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
}
