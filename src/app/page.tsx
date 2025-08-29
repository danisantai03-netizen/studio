import { Header } from "@/components/green-earth/Header";
import { PromoCarousel } from "@/components/green-earth/PromoCarousel";
import { FeatureLinks } from "@/components/green-earth/FeatureLinks";
import { WasteCategories } from "@/components/green-earth/WasteCategories";
import { RecyclingTip } from "@/components/green-earth/RecyclingTip";
import { BottomNav } from "@/components/green-earth/BottomNav";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <div className="flex-grow pb-20">
        <Header />
        <main className="container mx-auto p-4 md:p-8">
          <div className="flex flex-col gap-8">
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
