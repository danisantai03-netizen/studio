
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
      <div className="flex flex-col flex-grow pb-28">
        <Header />
        <main className="flex-grow space-y-6">
          <div className="px-4">
            <PointsDashboard />
          </div>
          <PromoCarousel />
          <div className="px-4">
             <h2 className="text-xl font-bold mb-4">Features</h2>
             <FeatureLinks />
          </div>
           <div className="px-4">
            <RecyclingTip />
          </div>
          <div className="px-4 space-y-4">
            <h2 className="text-xl font-bold">What are you recycling?</h2>
            <FilterBar />
          </div>
           <div className="px-4">
             <WasteCategories />
           </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
