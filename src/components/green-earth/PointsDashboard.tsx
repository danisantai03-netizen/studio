
'use client';

import { Button } from '@/components/ui/button';
import { History, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export function PointsDashboard() {
  const balance = 137000;
  const points = 1370;

  return (
    <section className="bg-primary text-primary-foreground p-4 rounded-xl shadow-lg w-full">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm opacity-80">Balance</p>
          <p className="text-2xl font-bold tracking-tight">Rp{balance.toLocaleString('id-ID')}</p>
        </div>
        <div className="text-right pl-4">
          <p className="text-sm opacity-80">Points</p>
          <p className="text-lg font-bold">{points.toLocaleString('id-ID')}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <Link href="/home/point-history" className="w-full">
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-primary-foreground w-full h-10 text-xs font-semibold">
              <History className="mr-2 h-4 w-4" /> History
            </Button>
        </Link>
        <Link href="/withdraw" className="w-full">
            <Button variant="secondary" className="bg-accent hover:bg-accent/90 text-accent-foreground h-10 text-xs font-semibold">
              <ArrowUpRight className="mr-2 h-4 w-4" /> Withdraw
            </Button>
        </Link>
      </div>
    </section>
  );
}
