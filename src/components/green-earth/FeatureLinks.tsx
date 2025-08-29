import { Trophy, Newspaper, Gift, CalendarHeart } from "lucide-react";

const features = [
  { name: "Leaderboard", icon: Trophy, href: "#" },
  { name: "Article", icon: Newspaper, href: "#" },
  { name: "Rewards", icon: Gift, href: "#" },
  { name: "Events", icon: CalendarHeart, href: "#" },
];

export function FeatureLinks() {
  return (
    <section aria-labelledby="features-heading">
      <h2 id="features-heading" className="sr-only">Features</h2>
      <div className="grid grid-cols-4 gap-4">
        {features.map((feature) => (
          <a
            href={feature.href}
            key={feature.name}
            className="flex flex-col items-center justify-center gap-2 group focus:outline-none focus:ring-0 transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full transition-all duration-200 ease-in-out group-hover:bg-primary/20">
              <feature.icon className="w-8 h-8 text-primary" />
            </div>
            <p className="font-semibold text-center text-sm text-foreground">{feature.name}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
