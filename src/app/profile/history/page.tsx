
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

const transactionHistory = [
  { id: 1, type: 'credit', amount: 500, points: 50, description: 'Recycled Plastic Bottles (2.5kg)', date: '2023-10-25', status: 'Completed' },
  { id: 2, type: 'debit', amount: 200, points: 20, description: 'Redeemed Coffee Voucher', date: '2023-10-24', status: 'Completed' },
  { id: 3, type: 'credit', amount: 150, points: 15, description: 'Recycled Newspapers (1.5kg)', date: '2023-10-22', status: 'Completed' },
  { id: 4, type: 'credit', amount: 800, points: 80, description: 'Recycled Aluminum Cans (0.8kg)', date: '2023-10-20', status: 'Completed' },
  { id: 5, type: 'debit', amount: 1000, points: 100, description: 'Donated to Tree Planting Initiative', date: '2023-10-18', status: 'Completed' },
];

export default function HistoryPage() {
  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Transaction History" showBackButton={true} />
      <main className="p-4 space-y-4">
        <Card>
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {transactionHistory.map((item) => (
                        <div key={item.id} className="flex items-center">
                            <div className={`p-2 rounded-full mr-4 ${item.type === 'credit' ? 'bg-green-100' : 'bg-red-100'}`}>
                                {item.type === 'credit' ? <ArrowDownLeft className="w-5 h-5 text-green-600" /> : <ArrowUpRight className="w-5 h-5 text-red-600" />}
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold">{item.description}</p>
                                <p className="text-sm text-muted-foreground">{item.date}</p>
                            </div>
                            <div className="text-right">
                                <p className={`font-bold ${item.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                                    {item.type === 'credit' ? '+' : '-'} {item.points} pts
                                </p>
                                <p className="text-sm text-muted-foreground">Rp {item.amount.toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
