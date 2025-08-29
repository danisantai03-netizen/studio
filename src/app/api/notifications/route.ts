import { NextResponse } from 'next/server';
import type { NotificationItem } from '@/hooks/use-notifications';

const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Double points on plastic bottles this week!',
    body: 'Recycle any plastic bottle at our designated centers and earn double the points. Offer valid until Sunday.',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    read: false,
    href: '#',
  },
  {
    id: '2',
    title: 'Community Cleanup Event',
    body: 'Join us this Saturday at 9 AM for a park cleanup drive. Your participation earns you 200 bonus points.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    read: false,
    href: '#',
  },
  {
    id: '3',
    title: 'Your weekly report is ready',
    body: 'You have recycled 5kg of materials this week. Great job!',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    read: true,
    href: '#',
  },
  {
    id: '4',
    title: 'New reward available!',
    body: 'You can now redeem your points for a reusable coffee cup. Check it out in the rewards section.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    read: true,
    href: '#',
  },
];

let db = [...mockNotifications];

export async function GET() {
  // In a real app, you would fetch this from a database
  const sorted = [...db].sort((a, b) => {
    if (a.read !== b.read) {
      return a.read ? 1 : -1;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  
  const totalUnread = db.filter(n => !n.read).length;

  return NextResponse.json({ data: sorted, totalUnread });
}

// NOTE: In a real app, you would have separate files for mark-read and mark-all-read
// but for this mock, we can just export other handlers from this file.
// Next.js file-system routing will ignore these.

export function updateReadStatus(ids: string[] | 'all', readStatus: boolean) {
    if (ids === 'all') {
        db = db.map(n => ({...n, read: readStatus}));
        return db.map(n => n.id);
    }
    
    let updatedIds: string[] = [];
    db = db.map(n => {
        if (ids.includes(n.id)) {
            updatedIds.push(n.id);
            return { ...n, read: readStatus };
        }
        return n;
    });
    return updatedIds;
}
