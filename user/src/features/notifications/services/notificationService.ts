
import { apiClient } from "@/services/apiClient";
import type { GetNotificationsResponse } from "@/features/notifications/types";

export async function getNotifications(): Promise<GetNotificationsResponse> {
  return apiClient<GetNotificationsResponse>('/notifications');
}

export async function markNotificationAsRead(ids: string[]): Promise<{ success: true; updatedIds: string[] }> {
  return apiClient('/notifications/mark-read', {
    method: 'POST',
    body: JSON.stringify({ ids }),
  });
}

export async function markAllNotificationsAsRead(): Promise<{ success: true }> {
  return apiClient('/notifications/mark-all-read', {
    method: 'POST',
  });
}
