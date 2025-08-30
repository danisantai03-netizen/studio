
"use client";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const features = [
  { name: "Donate", imgSrc: "/assets/mini-features/Rewards.svg", href: "#" },
  { name: "Leaderboard", imgSrc: "/assets/mini-features/Leaderboard.svg", href: "#" },
  { name: "Article", imgSrc: "/assets/mini-features/Article.svg", href: "#" },
  { name: "Community", imgSrc: "/assets/mini-features/Community.svg", href: "#" },
];

export function FeatureLinks() {
  return (
    <section aria-labelledby="features-heading">
      <h2 id="features-heading" className="text-xl font-bold mb-4 px-4">Features</h2>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-4 px-4 pb-3">
          {features.map((feature) => (
            <a
              href={feature.href}
              key={feature.name}
              className="flex flex-col items-center flex-shrink-0 w-[70px] text-center group"
            >
              <div className="flex items-center justify-center w-16 h-16 transition-all duration-200 ease-in-out group-hover:scale-105">
                <Image src={feature.imgSrc} alt={feature.name} width={48} height={48} />
              </div>
              <p className="font-semibold text-center text-xs text-foreground mt-1">{feature.name}</p>
            </a>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </section>
  );
}
