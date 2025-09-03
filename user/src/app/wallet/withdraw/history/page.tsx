
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { useQuery } from '@tanstack/react-query';
import { getWithdrawalHistory } from '@/features/withdraw/services/withdrawService';
import { Skeleton } from '@/components/ui/skeleton';
import type { WithdrawalHistoryItem } from '@/features/withdraw/types';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';

const statusConfig: Record<WithdrawalHistoryItem['status'], { text: string; color: string; icon: React.ElementType }> = {
  'In Progress': { text: 'Diproses', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300', icon: AlertCircle },
  'Success': { text: 'Berhasil', color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300', icon: CheckCircle2 },
  'Failed': { text: 'Gagal', color: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300', icon: XCircle },
};

const HistorySkeleton = () => (
    <ul className="divide-y divide-border">
        {[...Array(5)].map((_, i) => (
            <li key={i} className="py-4 px-4">
                <div className="flex items-start">
                    <Skeleton className="w-10 h-10 rounded-lg mr-4" />
                    <div className="flex-grow space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                    <div className="text-right space-y-2">
                        <Skeleton className="h-5 w-20 ml-auto" />
                    </div>
                </div>
            </li>
        ))}
    </ul>
);

export default function WithdrawHistoryPage() {
    const { data: history, isLoading, isError } = useQuery({
        queryKey: ['withdrawalHistory'],
        queryFn: getWithdrawalHistory
    });

    return (
        <div className="bg-background min-h-screen">
            <UniversalHeader title="Riwayat Penarikan" />
            <main className="w-full max-w-full mx-0 py-2">
                {isLoading ? (
                    <HistorySkeleton />
                ) : isError ? (
                    <p className="text-center text-red-500 p-4">Gagal memuat riwayat.</p>
                ) : history?.length === 0 ? (
                    <p className="text-center text-muted-foreground p-4">Belum ada riwayat penarikan.</p>
                ) : (
                    <ul className="divide-y divide-border">
                        {history?.map((item) => {
                            const Icon = statusConfig[item.status].icon;
                            return (
                                <li key={item.id}>
                                    <Link href={`/wallet/withdraw/${item.id}`} className="block w-full p-4 hover:bg-muted/40 active:bg-muted/80">
                                      <div className="flex items-center">
                                          <div className={`grid place-items-center w-10 h-10 rounded-lg mr-4 ${statusConfig[item.status].color}`}>
                                              <Icon className="w-5 h-5" />
                                          </div>
                                          <div className="flex-grow">
                                              <p className="font-semibold text-sm">Penarikan ke {item.method}</p>
                                              <p className="text-xs text-muted-foreground">{format(new Date(item.date), 'dd MMM yyyy, HH:mm')}</p>
                                          </div>
                                          <div className="text-right">
                                              <p className="font-bold text-sm">
                                                  -Rp{item.amount.toLocaleString('id-ID')}
                                              </p>
                                          </div>
                                      </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </main>
        </div>
    );
}
