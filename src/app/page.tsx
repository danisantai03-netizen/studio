
'use client';

import { BottomNav } from '@/components/green-earth/BottomNav';
import { FeatureLinks } from '@/components/green-earth/FeatureLinks';
import { FilterBar } from '@/components/green-earth/FilterBar';
import { Header } from '@/components/green-earth/Header';
import { PointsDashboard } from '@/components/green-earth/PointsDashboard';
import { PromoCarousel } from '@/components/green-earth/PromoCarousel';
import { RecyclingTip } from '@/components/green-earth/RecyclingTip';
import { WasteCategories } from '@/components/green-earth/WasteCategories';

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="flex flex-col flex-grow pb-20 w-full max-w-full mx-0 px-4 sm:px-6 md:px-8">
        <Header />
        <main className="flex-grow pt-4 space-y-6">
          <PointsDashboard />
          <FeatureLinks />
          <PromoCarousel />
          <RecyclingTip />
          <h2 className="text-lg font-bold">Schedule Pickup</h2>
          <FilterBar />
          <WasteCategories />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
