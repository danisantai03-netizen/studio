
import type { NextApiRequest, NextApiResponse } from 'next';
import type { WithdrawalHistoryItem } from '@/features/withdraw/types';

const withdrawalHistory: WithdrawalHistoryItem[] = [
  { 
    id: 'WD-1699887600000', 
    date: new Date('2023-11-13T15:00:00Z').toISOString(),
    amount: 50000, 
    status: 'Success',
    method: 'DANA'
  },
  { 
    id: 'WD-1699712400000', 
    date: new Date('2023-11-11T12:20:00Z').toISOString(),
    amount: 25000, 
    status: 'Success',
    method: 'GoPay'
  },
  { 
    id: 'WD-1699540800000', 
    date: new Date('2023-11-09T17:30:00Z').toISOString(),
    amount: 100000, 
    status: 'Failed',
    method: 'Bank Transfer'
  },
  { 
    id: 'WD-1698933600000', 
    date: new Date('2023-11-02T08:00:00Z').toISOString(),
    amount: 15000, 
    status: 'In Progress',
    method: 'OVO'
  },
];


export default function handler(req: NextApiRequest, res: NextApiResponse<WithdrawalHistoryItem[]>) {
    if (req.method === 'GET') {
        res.status(200).json(withdrawalHistory);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
