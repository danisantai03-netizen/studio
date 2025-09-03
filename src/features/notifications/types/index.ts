
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
