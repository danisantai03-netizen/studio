import { Header } from "@/components/green-earth/Header";
import { PromoCarousel } from "@/components/green-earth/PromoCarousel";
import { FeatureLinks } from "@/components/green-earth/FeatureLinks";
import { WasteCategories } from "@/components/green-earth/WasteCategories";
import { RecyclingTip } from "@/components/green-earth/RecyclingTip";
import { BottomNav } from "@/components/green-earth/BottomNav";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="flex flex-col flex-grow pb-24">
        <Header />
        <main className="flex-grow">
          <div className="flex flex-col gap-8 py-8 px-4">
            <PromoCarousel />
            <FeatureLinks />
            <RecyclingTip />
            <WasteCategories />
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
