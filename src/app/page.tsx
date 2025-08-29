import { UserProfile } from "@/components/green-earth/UserProfile";
import { PointsDashboard } from "@/components/green-earth/PointsDashboard";
import { PromoCarousel } from "@/components/green-earth/PromoCarousel";
import { FeatureLinks } from "@/components/green-earth/FeatureLinks";
import { WasteCategories } from "@/components/green-earth/WasteCategories";
import { RecyclingTip } from "@/components/green-earth/RecyclingTip";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto p-4">
          <UserProfile />
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col gap-8">
          <PointsDashboard />
          <PromoCarousel />
          <FeatureLinks />
          <RecyclingTip />
          <WasteCategories />
        </div>
      </main>
    </div>
  );
}
