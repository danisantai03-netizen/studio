
import type { NextApiRequest, NextApiResponse } from 'next';
import type { PaymentMethod } from '@/features/withdraw/types';

const paymentMethods: PaymentMethod[] = [
  { name: 'DANA', logo: '/images/ewallet/dana.png' },
  { name: 'OVO', logo: '/images/ewallet/ovo.png' },
  { name: 'GoPay', logo: '/images/ewallet/gopay.png' },
  { name: 'ShopeePay', logo: '/images/ewallet/shopeepay.png' },
  { name: 'Bank Transfer', logo: '/images/ewallet/bank.png' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse<PaymentMethod[]>) {
  if (req.method === 'GET') {
    // Simulate network delay
    setTimeout(() => {
        res.status(200).json(paymentMethods);
    }, 300);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
