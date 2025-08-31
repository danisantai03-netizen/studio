
'use client';

import { useParams } from 'next/navigation';
import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

const transactionHistory = [
  { id: 1, type: 'credit', amount: 500, points: 50, description: 'Recycled Plastic Bottles (2.5kg)', date: '2023-10-25', status: 'Completed', details: { pickupId: 'PU-XYZ-123', weight: '2.5 kg', pricePerKg: 200 } },
  { id: 2, type: 'debit', amount: 200, points: 20, description: 'Redeemed Coffee Voucher', date: '2023-10-24', status: 'Completed', details: { voucherCode: 'COFFEE-ABC-456' } },
  { id: 3, type: 'credit', amount: 150, points: 15, description: 'Recycled Newspapers (1.5kg)', date: '2023-10-22', status: 'Completed', details: { pickupId: 'PU-XYZ-124', weight: '1.5 kg', pricePerKg: 100 } },
  { id: 4, type: 'credit', amount: 800, points: 80, description: 'Recycled Aluminum Cans (0.8kg)', date: '2023-10-20', status: 'Completed', details: { pickupId: 'PU-XYZ-125', weight: '0.8 kg', pricePerKg: 1000 } },
  { id: 5, type: 'debit', amount: 1000, points: 100, description: 'Donated to Tree Planting Initiative', date: '2023-10-18', status: 'Completed', details: { donationId: 'DONATE-789' } },
];

export default function TransactionDetailPage() {
  const params = useParams();
  const transactionId = Number(params.transactionId);
  const transaction = transactionHistory.find(t => t.id === transactionId);

  if (!transaction) {
    return (
      <div className="bg-background min-h-screen">
        <UniversalHeader title="Transaction Not Found" />
        <main className="p-4 text-center">
          <p>The transaction details could not be found.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Transaction Detail" />
      <main className="p-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{transaction.description}</CardTitle>
                <CardDescription>{new Date(transaction.date).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</CardDescription>
              </div>
              <Badge variant={transaction.status === 'Completed' ? 'default' : 'secondary'} className={transaction.status === 'Completed' ? 'bg-green-600' : ''}>
                {transaction.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center">
                <div className={`p-2 rounded-full mr-4 ${transaction.type === 'credit' ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50'}`}>
                  {transaction.type === 'credit' ? <ArrowDownLeft className="w-5 h-5 text-green-600" /> : <ArrowUpRight className="w-5 h-5 text-red-600" />}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Points</p>
                  <p className={`font-bold text-lg ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'credit' ? '+' : '-'} {transaction.points}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="font-bold text-lg">Rp {transaction.amount.toLocaleString('id-ID')}</p>
              </div>
            </div>
            
            <div className="text-sm space-y-2 pt-4 border-t">
              <h3 className="font-semibold mb-2">Details</h3>
              {Object.entries(transaction.details).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <p className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
