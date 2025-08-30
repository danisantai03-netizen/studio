
"use client";
import { Trophy, Newspaper, Gift, CalendarHeart, Users, History } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const features = [
  { name: "Leaderboard", icon: Trophy, href: "#" },
  { name: "Article", icon: Newspaper, href: "#" },
  { name: "Rewards", icon: Gift, href: "#" },
  { name: "Events", icon: CalendarHeart, href: "#" },
  { name: "Community", icon: Users, href: "#" },
  { name: "History", icon: History, href: "#" },
];

export function FeatureLinks() {
  return (
    <section aria-labelledby="features-heading" className="py-2">
      <h2 id="features-heading" className="text-xl font-bold mb-4 px-4">Features</h2>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-4 px-4 pb-4">
          {features.map((feature) => (
            <a
              href={feature.href}
              key={feature.name}
              className="flex flex-col items-center flex-shrink-0 w-20 text-center group focus:outline-none focus:ring-0"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-primary/5 rounded-2xl transition-all duration-200 ease-in-out group-hover:bg-primary/10 border border-primary/10">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <p className="font-semibold text-center text-xs text-foreground mt-2">{feature.name}</p>
            </a>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </section>
  );
}
