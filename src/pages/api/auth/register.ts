
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fullName, email, password, referral } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Full name, email, and password are required' });
    }

    // Simulate checking if email already exists
    if (email === 'taken@example.com') {
        return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    // Simulate successful registration
    console.log('New user registered:', { fullName, email, referral: referral || 'N/A' });
    
    // In a real app, you would save the user to the database and send a verification email.
    // The response here is just a confirmation. The verification happens in the next step.
    return res.status(201).json({ message: 'Registration successful. Please check your email for a verification code.' });

  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
