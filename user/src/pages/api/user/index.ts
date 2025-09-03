
import type { NextApiRequest, NextApiResponse } from 'next';
import type { User } from '@/features/user/types';

// Mock user data
const mockUser: User = {
    userId: '1289-4720-3482',
    name: 'Alex Green',
    email: 'alex.green@example.com',
    avatarUrl: '/assets/avatars/alex-green.jpg',
    balance: 137000,
    points: 1370,
};

export default function handler(req: NextApiRequest, res: NextApiResponse<User | { message: string }>) {
  // In a real app, you would get the user from a session or token
  if (req.method === 'GET') {
    res.status(200).json(mockUser);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
