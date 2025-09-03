
import type { NextApiRequest, NextApiResponse } from 'next';

const CORRECT_OTP = '123456';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    if (otp === CORRECT_OTP) {
      // In a real app, you'd mark the user as verified in the database.
      console.log(`Email ${email} verified successfully.`);
      return res.status(200).json({ message: 'Email verified successfully.' });
    } else {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
