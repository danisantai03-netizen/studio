
'use client';

import { Button } from '@/components/ui/button';
import { History, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/features/user/hooks/useUser';
import { Skeleton } from '@/components/ui/skeleton';

export function PointsDashboard() {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return <PointsDashboardSkeleton />;
  }

  const balance = user?.balance ?? 0;
  const points = user?.points ?? 0;

  return (
    <section className="bg-primary text-primary-foreground p-4 rounded-xl shadow-lg w-full">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm opacity-80">Saldo</p>
          <p className="text-2xl font-bold tracking-tight">Rp{balance.toLocaleString('id-ID')}</p>
        </div>
        <div className="text-right pl-4">
          <p className="text-sm opacity-80">Poin</p>
          <p className="text-lg font-bold">{points.toLocaleString('id-ID')}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <Link href="/wallet/withdraw/history" className="w-full">
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-primary-foreground w-full h-10 text-xs font-semibold">
              <History className="mr-2 h-4 w-4" /> Riwayat
            </Button>
        </Link>
        <Link href="/withdraw" className="w-full">
            <Button variant="secondary" className="bg-accent hover:bg-accent/90 text-accent-foreground h-10 text-xs font-semibold">
              <ArrowUpRight className="mr-2 h-4 w-4" /> Tarik Saldo
            </Button>
        </Link>
      </div>
    </section>
  );
}

const PointsDashboardSkeleton = () => (
    <section className="bg-primary/80 text-primary-foreground p-4 rounded-xl shadow-lg w-full animate-pulse">
      <div className="flex justify-between items-start">
        <div className="flex-1 space-y-1">
          <Skeleton className="h-5 w-1/4 bg-white/30" />
          <Skeleton className="h-8 w-1/2 bg-white/30" />
        </div>
        <div className="text-right pl-4 space-y-1">
          <Skeleton className="h-5 w-16 bg-white/30 ml-auto" />
          <Skeleton className="h-6 w-20 bg-white/30 ml-auto" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <Skeleton className="h-10 w-full bg-white/30 rounded-md" />
        <Skeleton className="h-10 w-full bg-white/30 rounded-md" />
      </div>
    </section>
);
