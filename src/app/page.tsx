
import { Header } from "@/components/green-earth/Header";
import { PointsDashboard } from "@/components/green-earth/PointsDashboard";
import { PromoCarousel } from "@/components/green-earth/PromoCarousel";
import { FeatureLinks } from "@/components/green-earth/FeatureLinks";
import { RecyclingTip } from "@/components/green-earth/RecyclingTip";
import { BottomNav } from "@/components/green-earth/BottomNav";
import { WasteCategories } from "@/components/green-earth/WasteCategories";
import { FilterBar } from "@/components/green-earth/FilterBar";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="flex flex-col flex-grow pb-20 w-full max-w-full mx-0 px-4 sm:px-6 md:px-8">
        <Header />
        <main className="flex-grow space-y-6">
          <PointsDashboard />
          <PromoCarousel />
          <div>
             <h2 className="text-lg font-bold mb-3">Features</h2>
             <FeatureLinks />
          </div>
          <div>
            <RecyclingTip />
          </div>
          <div className="space-y-3">
            <h2 className="text-lg font-bold">What are you recycling?</h2>
            <FilterBar />
          </div>
          <div>
             <WasteCategories />
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
