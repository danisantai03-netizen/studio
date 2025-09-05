
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Voucher } from '@/features/withdraw/types';

const vouchers: Voucher[] = [
  { name: 'Coffee Voucher', points: 200 },
  { name: 'PLN Token', points: 1000 },
  { name: 'Free Shipping', points: 500 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse<Voucher[]>) {
  if (req.method === 'GET') {
    // Simulate network delay
    setTimeout(() => {
        res.status(200).json(vouchers);
    }, 500);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
