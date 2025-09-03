
"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const promotions = [
  {
    title: "Double Points Week",
    description: "Recycle electronics & earn double points!",
    image: "/assets/promos/promo-1.jpg",
    aiHint: "electronics recycling"
  },
  {
    title: "Community Cleanup Drive",
    description: "Join us this Saturday for a park cleanup.",
    image: "/assets/promos/promo-2.jpg",
    aiHint: "community park"
  },
  {
    title: "New Recycling Center",
    description: "A new center is now open in your area.",
    image: "/assets/promos/promo-3.jpg",
    aiHint: "recycling center"
  },
];

export function PromoCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  
  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    api.on("select", handleSelect);

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      api.off("select", handleSelect);
    }
  }, [api]);

  return (
    <section aria-labelledby="promotions-heading">
      <div className="relative">
        <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
          <CarouselContent className="-ml-3">
            {promotions.map((promo, index) => (
              <CarouselItem key={index} className="pl-3">
                <Card className="overflow-hidden shadow-lg h-full w-full rounded-xl border-none aspect-[16/9] sm:aspect-video">
                  <CardContent className="relative p-0 w-full h-full">
                    <Image
                      src={promo.image}
                      alt={promo.title}
                      fill
                      className="object-cover"
                      data-ai-hint={promo.aiHint}
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="text-base sm:text-lg font-bold">{promo.title}</h3>
                      <p className="mt-1 max-w-lg text-xs sm:text-sm">{promo.description}</p>
                      <Button size="sm" className="mt-2 bg-accent text-accent-foreground font-semibold px-4 py-2 text-xs h-auto rounded-full shadow-md transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 sm:mt-3 sm:px-6 sm:py-2.5 sm:text-sm">
                        Join Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-1.5">
          {promotions.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full",
                current === index ? "bg-white" : "bg-white/40"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
