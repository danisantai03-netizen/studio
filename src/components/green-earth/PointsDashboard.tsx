
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { History, Gift } from 'lucide-react';
import { formatPointsAsCurrency } from '@/lib/utils';
import Link from 'next/link';

export function PointsDashboard() {
  const points = 1370;

  return (
    <section>
      <Card className="bg-primary text-primary-foreground shadow-lg rounded-2xl w-full">
        <CardContent className="p-4 sm:p-5">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <div>
              <p className="text-sm opacity-80">Your Points</p>
              <p className="text-2xl sm:text-3xl font-bold">{points.toLocaleString('id-ID')}</p>
            </div>
            <p className="text-xs sm:text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
              {formatPointsAsCurrency(points)}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <Link href="/profile/history" className="w-full">
                <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-primary-foreground w-full h-10 text-xs sm:text-sm">
                  <History className="mr-2 h-4 w-4" /> History
                </Button>
            </Link>
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-primary-foreground h-10 text-xs sm:text-sm">
              <Gift className="mr-2 h-4 w-4" /> Redeem
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
