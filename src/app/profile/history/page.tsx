
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

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
      <UniversalHeader title="Transaction History" />
      <main className="w-full max-w-full mx-0 px-0 sm:px-6 md:px-8 py-4">
        <ul className="divide-y divide-border">
            {transactionHistory.map((item) => (
                <li key={item.id}>
                    <Link href={`/profile/history/${item.id}`} className="block px-4 py-3 hover:bg-muted/40 active:scale-[0.99] transition-all duration-150">
                         <div className="flex items-center">
                            <div className={`p-2 rounded-full mr-4 ${item.type === 'credit' ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50'}`}>
                                {item.type === 'credit' ? <ArrowDownLeft className="w-5 h-5 text-green-600" /> : <ArrowUpRight className="w-5 h-5 text-red-600" />}
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold text-sm">{item.description}</p>
                                <p className="text-xs text-muted-foreground">{item.date}</p>
                            </div>
                            <div className="text-right">
                                <p className={`font-bold text-sm ${item.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                                    {item.type === 'credit' ? '+' : '-'} {item.points} pts
                                </p>
                                <p className="text-xs text-muted-foreground">Rp {item.amount.toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
      </main>
    </div>
  );
}
