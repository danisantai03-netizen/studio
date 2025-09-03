
import type { NextApiRequest, NextApiResponse } from 'next';
import type { LeaderboardItem } from '@/features/leaderboard/types';

const leaderboardData: { [key: string]: LeaderboardItem[] } = {
  'this_week': [
    { rank: 1, userId: 'u_123', displayName: 'Kiara', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', points: 9800, isCurrentUser: false },
    { rank: 2, userId: 'u_456', displayName: 'Budi S.', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e', points: 9540, isCurrentUser: false },
    { rank: 3, userId: 'u_789', displayName: 'Alex Green', avatarUrl: '/assets/avatars/alex-green.jpg', points: 9210, isCurrentUser: true },
    { rank: 4, userId: 'u_101', displayName: 'Citra W.', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704f', points: 8950, isCurrentUser: false },
    { rank: 5, userId: 'u_112', displayName: 'David K.', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704a', points: 8800, isCurrentUser: false },
    ...Array.from({ length: 45 }, (_, i) => ({
      rank: i + 6,
      userId: `u_mock_${i+6}`,
      displayName: `User ${i+6}`,
      points: 8800 - (i + 1) * 150,
      avatarUrl: `https://i.pravatar.cc/150?u=a${i+6}`,
      isCurrentUser: false,
    }))
  ],
  'this_month': [
    { rank: 1, userId: 'u_789', displayName: 'Alex Green', avatarUrl: '/assets/avatars/alex-green.jpg', points: 35210, isCurrentUser: true },
    { rank: 2, userId: 'u_123', displayName: 'Kiara', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', points: 34800, isCurrentUser: false },
    { rank: 3, userId: 'u_456', displayName: 'Budi S.', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e', points: 33700, isCurrentUser: false },
    { rank: 4, userId: 'u_112', displayName: 'David K.', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704a', points: 32900, isCurrentUser: false },
    { rank: 5, userId: 'u_101', displayName: 'Citra W.', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704f', points: 31500, isCurrentUser: false },
     ...Array.from({ length: 45 }, (_, i) => ({
      rank: i + 6,
      userId: `u_mock_month_${i+6}`,
      displayName: `User M ${i+6}`,
      points: 31500 - (i + 1) * 350,
      avatarUrl: `https://i.pravatar.cc/150?u=b${i+6}`,
      isCurrentUser: false,
    }))
  ],
};


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { period } = req.query;

    if (period === 'this_week' || period === 'this_month') {
        setTimeout(() => {
            res.status(200).json(leaderboardData[period]);
        }, 500); // Simulate network delay
    } else {
        res.status(400).json({ message: 'Invalid period specified' });
    }
}
