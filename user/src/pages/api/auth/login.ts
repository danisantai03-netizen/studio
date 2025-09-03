
import type { NextApiRequest, NextApiResponse } from 'next';

// This is a mock database of users. In a real app, use a proper database.
const users = [
  { email: 'user@example.com', password: 'Password123', otpRequired: true },
  { email: 'test@test.com', password: 'Password123', otpRequired: false },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      // Use a timeout to mitigate timing attacks
      return setTimeout(() => {
        res.status(401).json({ message: 'Invalid credentials' });
      }, 500);
    }
    
    // Simulate setting an httpOnly cookie if OTP is not required
    if (!user.otpRequired) {
        res.setHeader('Set-Cookie', 'session_token=mock_session_token; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax');
    }
    
    // Respond with whether OTP is needed
    return res.status(200).json({ otpRequired: user.otpRequired });

  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
