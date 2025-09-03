
import type { NextApiRequest, NextApiResponse } from 'next';
import type { TransactionDetails } from '@/features/pickup/types';

const mockTransactionData: { [key: string]: TransactionDetails } = {
  'trip_123': {
    transactionId: 'TRN-2024-08-01-ABC',
    itemPhotoUrl: 'https://picsum.photos/400/300',
    category: 'Plastic Bottles',
    weight: 5.2,
    pricePerKg: 2000,
    pickupDate: '2024-09-03T10:30:00Z',
    driver: {
      name: 'Budi Santoso',
      vehicle: 'Honda Vario',
      plate: 'B 1234 XYZ',
    }
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tripId } = req.query;

  if (typeof tripId !== 'string') {
    return res.status(400).json({ message: 'Invalid tripId' });
  }

  const transaction = mockTransactionData[tripId];

  if (transaction) {
    res.status(200).json(transaction);
  } else {
    res.status(404).json({ message: 'Transaction not found' });
  }
}
