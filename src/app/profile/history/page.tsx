
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTransactionHistory } from '@/features/user/services/userService';
import { Skeleton } from '@/components/ui/skeleton';
import type { TransactionHistoryItem } from '@/features/user/types';

const statusConfig: { [key: string]: string } = {
  Completed: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700',
  'Picked Up': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700',
  Scheduled: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700',
  Canceled: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700',
};

const ExpandableRow = ({ item }: { item: TransactionHistoryItem }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
       <li className="py-4">
          <div className="flex items-start" role="button" onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}>
              <div className="flex-grow">
                  <p className="font-semibold text-sm">Sale of {item.wasteType}</p>
                  <p className="text-xs text-muted-foreground">{format(new Date(item.date), 'dd MMM yyyy, HH:mm')}</p>
                  <Badge className={cn("mt-2 text-xs", statusConfig[item.status])}>{item.status}</Badge>
              </div>
              <div className="text-right">
                  <p className={`font-bold text-sm text-green-600`}>
                      Rp {item.earnings.toLocaleString('id-ID')}
                  </p>
                   <p className="text-xs text-muted-foreground mt-1 flex items-center justify-end">
                      Details <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </p>
              </div>
          </div>

           {isOpen && (
              <div className="mt-4 pt-4 border-t border-dashed text-xs space-y-2">
                  <div className="flex justify-between">
                      <span className="text-muted-foreground">Invoice ID</span>
                      <span className="font-mono">{item.id}</span>
                  </div>
                   <div className="flex justify-between">
                      <span className="text-muted-foreground">Weight</span>
                      <span>{item.weight} kg</span>
                  </div>
                   <div className="flex justify-between">
                      <span className="text-muted-foreground">Price per Kg</span>
                      <span>Rp {item.pricePerKg.toLocaleString('id-ID')}</span>
                  </div>
                   {item.driver && <div className="flex justify-between">
                      <span className="text-muted-foreground">Pickup Partner</span>
                      <span>{item.driver}</span>
                  </div>}
              </div>
          )}
       </li>
    );
};

const HistorySkeleton = () => (
    <ul className="divide-y divide-border">
        {[...Array(5)].map((_, i) => (
            <li key={i} className="py-4">
                <div className="flex items-start">
                    <div className="flex-grow space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-6 w-1/4" />
                    </div>
                    <div className="text-right space-y-2">
                        <Skeleton className="h-5 w-20 ml-auto" />
                        <Skeleton className="h-4 w-16 ml-auto" />
                    </div>
                </div>
            </li>
        ))}
    </ul>
);


export default function HistoryPage() {
    const { data: history, isLoading, isError } = useQuery({
        queryKey: ['transactionHistory'],
        queryFn: getTransactionHistory
    });

  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Transaction History" />
      <main className="w-full max-w-full mx-0 px-4 sm:px-6 md:px-8 py-4">
        {isLoading ? (
            <HistorySkeleton />
        ) : isError ? (
            <p className="text-center text-red-500">Failed to load history.</p>
        ) : (
            <ul className="divide-y divide-border">
                {history?.map((item) => (
                   <ExpandableRow key={item.id} item={item} />
                ))}
            </ul>
        )}
      </main>
    </div>
  );
}
