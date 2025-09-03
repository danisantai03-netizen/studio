
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, context } = req.body;
    if (!email || !context) {
      return res.status(400).json({ message: 'Email and context are required' });
    }
    // Simulate sending a new OTP
    console.log(`Resending OTP for ${email} with context: ${context}`);
    return res.status(200).json({ message: 'A new OTP has been sent.' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
