
import type { NextApiRequest, NextApiResponse } from 'next/server';
import type { NotificationItem } from '@/features/notifications/types';

// Let's use a "global" variable to simulate a database for mock purposes.
// NOTE: This is NOT thread-safe and only works because Next.js dev server often runs in a single thread.
// In a real app, this would be a database call.

let mockNotifications: NotificationItem[] = [
    {
      id: '1',
      title: 'Double points on plastic bottles this week!',
      body: 'Recycle any plastic bottle at our designated centers and earn double the points. Offer valid until Sunday.',
      createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      read: false,
      href: '#',
    },
    {
      id: '2',
      title: 'Community Cleanup Event',
      body: 'Join us this Saturday at 9 AM for a park cleanup drive. Your participation earns you 200 bonus points.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      read: false,
      href: '#',
    },
    {
      id: '3',
      title: 'Your weekly report is ready',
      body: 'You have recycled 5kg of materials this week. Great job!',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      read: true,
      href: '#',
    },
    {
      id: '4',
      title: 'New reward available!',
      body: 'You can now redeem your points for a reusable coffee cup. Check it out in the rewards section.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      read: true,
      href: '#',
    },
];

export function getDb() {
    return mockNotifications;
}

export function setDb(newDb: NotificationItem[]) {
    mockNotifications = newDb;
}


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const db = getDb();
        const sorted = [...db].sort((a, b) => {
            if (a.read !== b.read) {
            return a.read ? 1 : -1;
            }
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        
        const totalUnread = db.filter(n => !n.read).length;

        res.status(200).json({ data: sorted, totalUnread });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
