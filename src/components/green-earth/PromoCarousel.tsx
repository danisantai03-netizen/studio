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
    image: "https://picsum.photos/1200/800?random=1",
    aiHint: "electronics recycling"
  },
  {
    title: "Community Cleanup Drive",
    description: "Join us this Saturday for a park cleanup.",
    image: "https://picsum.photos/1200/800?random=2",
    aiHint: "community park"
  },
  {
    title: "New Recycling Center",
    description: "A new center is now open in your area.",
    image: "https://picsum.photos/1200/800?random=3",
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
    <section aria-labelledby="promotions-heading" className="px-4">
      <h2 id="promotions-heading" className="sr-only">What's New</h2>
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {promotions.map((promo, index) => (
            <CarouselItem key={index}>
              <Card className="overflow-hidden shadow-lg rounded-2xl transition-transform duration-200 ease-in-out hover:shadow-xl active:scale-95">
                <CardContent className="relative p-0 aspect-[16/9] md:aspect-[21/9]">
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    className="object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                    data-ai-hint={promo.aiHint}
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white">
                    <h3 className="text-xl md:text-2xl font-bold">{promo.title}</h3>
                    <p className="mt-1 max-w-lg text-sm md:text-base">{promo.description}</p>
                    <Button size="sm" className="mt-3 bg-accent text-accent-foreground font-semibold px-4 rounded-full shadow-md transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95">
                      Join Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center gap-2 mt-3">
        {promotions.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              current === index ? "p-1.5 bg-primary" : "bg-primary/20"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
