
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { amount, method, accountNumber, fullName } = req.body;

    if (!amount || !method || !accountNumber || !fullName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Simulate some validation and processing
    if (amount < 10000) {
        return res.status(400).json({ message: 'Minimum withdrawal amount is Rp 10,000' });
    }

    // In a real app, you would save this to a database and process the payment.
    const withdrawId = `WD-${Date.now()}`;
    
    // Simulate a delay
    setTimeout(() => {
        res.status(200).json({ withdrawId });
    }, 1000);

  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
