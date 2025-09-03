
import type { NextApiRequest, NextApiResponse } from 'next';
import { getDb, setDb } from './index';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      let db = getDb();
      db = db.map(n => ({ ...n, read: true }));
      setDb(db);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
