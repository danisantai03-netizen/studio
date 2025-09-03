
import type { NextApiRequest, NextApiResponse } from 'next';
import { getDb, setDb } from './index';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { ids } = req.body;
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: "Invalid 'ids' provided" });
      }

      let db = getDb();
      let updatedIds: string[] = [];
      const newDb = db.map(n => {
        if (ids.includes(n.id)) {
          updatedIds.push(n.id);
          return { ...n, read: true };
        }
        return n;
      });
      setDb(newDb);
      
      return res.status(200).json({ success: true, updatedIds });
    } catch (error) {
      return res.status(400).json({ error: "Invalid request body" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
