import { Card, CardContent } from "@/components/ui/card";
import { HeartHandshake, Newspaper, Trophy, Gamepad2 } from "lucide-react";

const features = [
  { name: "Donate", icon: HeartHandshake, href: "#" },
  { name: "Articles", icon: Newspaper, href: "#" },
  { name: "Leaderboard", icon: Trophy, href: "#" },
  { name: "Recycling Game", icon: Gamepad2, href: "#" },
];

export function FeatureLinks() {
  return (
    <section aria-labelledby="features-heading">
      <h2 id="features-heading" className="sr-only">Features</h2>
      <div className="grid grid-cols-4 gap-4">
        {features.map((feature) => (
          <a href={feature.href} key={feature.name} className="block group rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
            <Card className="shadow-md transition-colors active:bg-card/60">
              <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-center gap-2 aspect-square">
                <feature.icon className="w-8 h-8 text-primary" />
                <p className="font-semibold text-center text-sm">{feature.name}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}
