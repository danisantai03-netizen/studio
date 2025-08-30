
import { CategoryGrid } from "@/components/green-earth/CategoryGrid";
import { Header } from "@/components/green-earth/Header";
import { BottomNav } from "@/components/green-earth/BottomNav";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="flex flex-col flex-grow pb-24">
        <Header />
        <main className="flex-grow">
          <CategoryGrid />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
