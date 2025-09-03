
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    console.log(`Password reset requested for: ${email}`);
    // In a real app, you would trigger a password reset email here.
    // We always return a success response to prevent email enumeration.
    return res.status(200).json({ message: 'If an account with that email exists, a password reset link has been sent.' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
