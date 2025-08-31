
'use client';

import { BottomNav } from '@/components/green-earth/BottomNav';
import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const MapWithNoSSR = dynamic(
  () => import('@/components/green-earth/MapLeaflet').then((mod) => mod.MapLeaflet),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[calc(100vh-150px)] bg-muted" />,
  }
);

export default function MapsPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <UniversalHeader title="Live Map" showBackButton={false} />

      <main className="flex-grow p-3">
        <div className="w-full h-[calc(100vh-150px)] rounded-lg overflow-hidden shadow-md">
            <MapWithNoSSR />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
