
'use client';

import { BottomNav } from '@/components/green-earth/BottomNav';
import { FeatureLinks } from '@/components/green-earth/FeatureLinks';
import { FilterBar } from '@/components/green-earth/FilterBar';
import { Header } from '@/components/green-earth/Header';
import { PointsDashboard } from '@/features/user/components/PointsDashboard';
import { PromoCarousel } from '@/components/green-earth/PromoCarousel';
import { RecyclingTip } from '@/components/green-earth/RecyclingTip';
import { WasteCategories } from '@/components/green-earth/WasteCategories';
import { useUser } from '@/features/user/hooks/useUser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { data: user, isLoading, isError } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If loading is done and there's an error (e.g., 401 Unauthorized), redirect to login
    if (!isLoading && isError) {
      router.replace('/login');
    }
  }, [isLoading, isError, router]);

  // Optionally, show a loading screen while checking auth status
  if (isLoading || !user) {
    // This can be a full-page skeleton loader
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

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
