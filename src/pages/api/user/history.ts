
import type { NextApiRequest, NextApiResponse } from 'next';
import type { TransactionHistoryItem } from '@/features/user/types';

const transactionHistory: TransactionHistoryItem[] = [
  { 
    id: 'TXN-20231102-001', 
    date: new Date('2023-11-02T11:00:00').toISOString(),
    earnings: 25000, 
    status: 'Completed',
    wasteType: 'Plastic Bottles',
    weight: 12.5,
    pricePerKg: 2000,
    driver: 'Budi Santoso'
  },
  { 
    id: 'TXN-20231101-002', 
    date: new Date('2023-11-01T15:30:00').toISOString(),
    earnings: 8000, 
    status: 'Picked Up',
    wasteType: 'Cardboard',
    weight: 10,
    pricePerKg: 800,
    driver: 'Citra Lestari'
  },
  { 
    id: 'TXN-20231030-001', 
    date: new Date('2023-10-30T09:00:00').toISOString(),
    earnings: 0, 
    status: 'Scheduled',
    wasteType: 'Aluminum Cans',
    weight: 5,
    pricePerKg: 10000,
    driver: 'Agus Wijaya'
  },
  { 
    id: 'TXN-20231028-001', 
    date: new Date('2023-10-28T14:10:00').toISOString(),
    earnings: 15000, 
    status: 'Completed',
    wasteType: 'Glass Jars',
    weight: 10,
    pricePerKg: 1500,
    driver: 'Budi Santoso'
  },
  { 
    id: 'TXN-20231025-003', 
    date: new Date('2023-10-25T12:00:00').toISOString(),
    earnings: 0, 
    status: 'Canceled',
    wasteType: 'Newspapers',
    weight: 20,
    pricePerKg: 1000,
    driver: null
  },
];


export default function handler(req: NextApiRequest, res: NextApiResponse<TransactionHistoryItem[]>) {
    if (req.method === 'GET') {
        res.status(200).json(transactionHistory);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
