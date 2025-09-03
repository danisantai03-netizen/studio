
import type { NextApiRequest, NextApiResponse } from 'next';
import type { User } from '@/features/user/types';

// Mock user data
const mockUser: User = {
    userId: '1289-4720-3482',
    name: 'Alex Green',
    email: 'user@example.com',
    avatarUrl: '/assets/avatars/alex-green.jpg',
    balance: 137000,
    points: 1370,
};

export default function handler(req: NextApiRequest, res: NextApiResponse<User | { message: string }>) {
  if (req.method === 'GET') {
    // In a real app, you would verify the session token from the cookie
    const token = req.cookies.session_token;

    if (token === 'mock_session_token') {
      return res.status(200).json(mockUser);
    } else {
      // If no valid token, return 401 Unauthorized
      return res.status(401).json({ message: 'Not authenticated' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
