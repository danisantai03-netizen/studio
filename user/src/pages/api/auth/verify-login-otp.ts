
import type { NextApiRequest, NextApiResponse } from 'next';

const CORRECT_OTP = '123456';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    if (otp === CORRECT_OTP) {
      // In a real app, you would finalize the session here
      // and set a secure, httpOnly cookie.
      res.setHeader('Set-Cookie', 'session_token=mock_session_token; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax');
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
