
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
      <div className="flex flex-col flex-grow pb-24">
        <Header />
        <main className="flex-grow space-y-6">
          <PointsDashboard />
          <PromoCarousel />
          <FeatureLinks />
          <RecyclingTip />
          <div className="px-4">
            <FilterBar />
          </div>
          <WasteCategories />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
