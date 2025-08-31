
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { ArrowDownLeft, ArrowUpRight, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const pointHistory = [
  { 
    id: 'WD-20231101-001', 
    type: 'debit', 
    points: 50000, 
    description: 'Withdraw to GoPay', 
    date: new Date('2023-11-01T14:30:00'), 
    status: 'Success' 
  },
  { 
    id: 'RD-20231028-005', 
    type: 'debit', 
    points: 200, 
    description: 'Redeemed Coffee Voucher', 
    date: new Date('2023-10-28T10:15:00'), 
    status: 'Success' 
  },
  { 
    id: 'RD-20231025-004', 
    type: 'debit', 
    points: 1000, 
    description: 'Redeemed PLN Token', 
    date: new Date('2023-10-25T18:00:00'), 
    status: 'Pending' 
  },
  { 
    id: 'WD-20231022-001', 
    type: 'debit', 
    points: 25000, 
    description: 'Withdraw to OVO', 
    date: new Date('2023-10-22T09:05:00'), 
    status: 'Failed' 
  },
  { 
    id: 'TXN-20231020-001', 
    type: 'credit', 
    points: 80, 
    description: 'Points from recycling aluminum', 
    date: new Date('2023-10-20T11:45:00'), 
    status: 'Success' 
  },
];

const statusConfig = {
  Success: { icon: CheckCircle2, color: 'text-green-500' },
  Pending: { icon: AlertCircle, color: 'text-yellow-500' },
  Failed: { icon: XCircle, color: 'text-red-500' },
};


export default function PointHistoryPage() {
  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Point History" />
      <main className="w-full max-w-full mx-0 px-4 sm:px-6 md:px-8 py-4">
        <ul className="divide-y divide-border">
            {pointHistory.map((item) => {
              const Icon = item.type === 'credit' ? ArrowDownLeft : ArrowUpRight;
              const itemColor = item.type === 'credit' ? 'text-green-600' : 'text-red-600';
              const StatusIcon = statusConfig[item.status as keyof typeof statusConfig].icon;
              const statusColor = statusConfig[item.status as keyof typeof statusConfig].color;

              return (
                <li key={item.id} className="py-4">
                     <div className="flex items-center">
                        <div className={`p-2 rounded-full mr-4 ${item.type === 'credit' ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50'}`}>
                            <Icon className={cn("w-5 h-5", itemColor)} />
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold text-sm">{item.description}</p>
                            <p className="text-xs text-muted-foreground">{format(item.date, 'dd MMM yyyy, HH:mm')}</p>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <StatusIcon className={cn("w-3.5 h-3.5 mr-1", statusColor)} />
                                <span className={statusColor}>{item.status}</span>
                           </div>
                        </div>
                        <div className="text-right">
                            <p className={cn("font-bold text-sm", itemColor)}>
                                {item.type === 'credit' ? '+' : '-'} {item.points.toLocaleString('id-ID')}
                            </p>
                            <p className="text-xs text-muted-foreground">Points</p>
                        </div>
                    </div>
                </li>
              );
            })}
        </ul>
      </main>
    </div>
  );
}
