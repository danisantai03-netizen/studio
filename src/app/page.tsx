
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
import { Skeleton } from '@/components/ui/skeleton';

const HomePageSkeleton = () => (
  <div className="flex flex-col flex-grow pb-20 w-full max-w-full mx-0 px-4 sm:px-6 md:px-8">
    <Header />
    <main className="flex-grow pt-4 space-y-6">
      <PointsDashboard />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="aspect-[16/9] w-full rounded-xl" />
      <Skeleton className="h-20 w-full" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-8 w-full" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Skeleton className="aspect-[4/3] w-full" />
          <Skeleton className="aspect-[4/3] w-full" />
          <Skeleton className="aspect-[4/3] w-full" />
        </div>
      </div>
    </main>
  </div>
);


export default function HomePage() {
  const { data: user, isLoading, isError } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If loading is done and there's an error (e.g., 401 Unauthorized), redirect to login
    if (!isLoading && isError) {
      router.replace('/login');
    }
  }, [isLoading, isError, router]);

  // To prevent hydration errors, we render the page structure immediately.
  // The loading state is handled by skeletons within the child components (Header, PointsDashboard).
  // If the user is not authenticated, the effect will redirect them.
  // This ensures the initial render matches between server and client.
  if (isLoading || isError) {
    return (
       <div className="bg-background min-h-screen">
          <HomePageSkeleton />
          <BottomNav />
      </div>
    );
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
