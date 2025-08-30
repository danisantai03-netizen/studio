
import { Header } from "@/components/green-earth/Header";
import { PointsDashboard } from "@/components/green-earth/PointsDashboard";
import { PromoCarousel } from "@/components/green-earth/PromoCarousel";
import { FeatureLinks } from "@/components/green-earth/FeatureLinks";
import { CategoryGrid } from "@/components/green-earth/CategoryGrid";
import { RecyclingTip } from "@/components/green-earth/RecyclingTip";
import { BottomNav } from "@/components/green-earth/BottomNav";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="flex flex-col flex-grow pb-24">
        <Header />
        <main className="flex-grow space-y-6">
          <PointsDashboard />
          <PromoCarousel />
          <FeatureLinks />
          <CategoryGrid />
          <RecyclingTip />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
