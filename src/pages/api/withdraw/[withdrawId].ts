
import type { NextApiRequest, NextApiResponse } from 'next';
import type { WithdrawalDetails } from '@/features/withdraw/types';

// Again, using a "global" mock DB for this example.
const mockDb: { [key: string]: WithdrawalDetails } = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { withdrawId } = req.query;

    if (req.method === 'GET') {
        if (!withdrawId || typeof withdrawId !== 'string') {
            return res.status(400).json({ message: 'Invalid withdrawId' });
        }
        
        // This is a simple mock. In a real app, you'd fetch from a database.
        // Let's create one on the fly if it doesn't exist for demo purposes.
        if (!mockDb[withdrawId]) {
            mockDb[withdrawId] = {
                status: 'In Progress',
                amount: Math.floor(Math.random() * 100000) + 10000,
                fullName: 'Alex Green (Mocked)',
                accountNumber: '081234567890',
                method: 'DANA',
                date: new Date().toISOString(),
            };
            // Simulate it completing after a delay
            setTimeout(() => {
                if (mockDb[withdrawId]) {
                    mockDb[withdrawId].status = 'Success';
                }
            }, 5000);
        }

        const details = mockDb[withdrawId];

        if (details) {
            return res.status(200).json(details);
        } else {
            return res.status(404).json({ message: 'Withdrawal not found' });
        }
    }

    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
