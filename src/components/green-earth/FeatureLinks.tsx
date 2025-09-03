
"use client";
import Image from "next/image";
import Link from "next/link";

const features = [
  { name: "Donate", imgSrc: "/images/icons/donate.png", href: "/features/donate" },
  { name: "Leaderboard", imgSrc: "/images/icons/leaderboard.png", href: "/features/leaderboard" },
  { name: "Article", imgSrc: "/images/icons/article.png", href: "/features/articles" },
  { name: "Community", imgSrc: "/images/icons/community.png", href: "/features/community" },
];

export function FeatureLinks() {
  return (
    <section aria-labelledby="features-heading">
      <h2 id="features-heading" className="sr-only">Features</h2>
      <div className="grid grid-cols-4 gap-3">
        {features.map((feature, index) => (
          <Link
            href={feature.href}
            key={feature.name}
            className="flex flex-col items-center justify-start text-center group"
            prefetch={true}
          >
            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 transition-all duration-200 ease-in-out group-hover:scale-105 rounded-xl bg-card shadow-sm p-3">
              <Image 
                src={feature.imgSrc} 
                alt={feature.name} 
                width={40} 
                height={40} 
                className="h-6 w-6 sm:h-7 sm:w-7"
                priority={index < 4} // Prioritize loading for visible icons
              />
            </div>
            <p className="font-medium text-center text-xs text-foreground mt-2 w-full truncate sm:text-sm">{feature.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
