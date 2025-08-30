
"use client";
import Image from "next/image";

const features = [
  { name: "Donate", imgSrc: "/assets/mini-features/Donate.svg", href: "#" },
  { name: "Leaderboard", imgSrc: "/assets/mini-features/Leaderboard.svg", href: "#" },
  { name: "Article", imgSrc: "/assets/mini-features/Article.svg", href: "#" },
  { name: "Community", imgSrc: "/assets/mini-features/Community.svg", href: "#" },
];

export function FeatureLinks() {
  return (
    <section aria-labelledby="features-heading">
      <h2 id="features-heading" className="sr-only">Features</h2>
      <div className="grid grid-cols-4 gap-3">
        {features.map((feature) => (
          <a
            href={feature.href}
            key={feature.name}
            className="flex flex-col items-center justify-start text-center group"
          >
            <div className="flex items-center justify-center w-16 h-16 transition-all duration-200 ease-in-out group-hover:scale-105 rounded-2xl bg-white shadow-sm p-3">
              <Image src={feature.imgSrc} alt={feature.name} width={48} height={48} />
            </div>
            <p className="font-semibold text-center text-xs text-foreground mt-2 w-full truncate">{feature.name}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
