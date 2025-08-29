"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const promotions = [
  {
    title: "Double Points Week",
    description: "Recycle electronics & earn double points!",
    image: "https://picsum.photos/1200/600?random=1",
    aiHint: "electronics recycling"
  },
  {
    title: "Community Cleanup Drive",
    description: "Join us this Saturday for a park cleanup.",
    image: "https://picsum.photos/1200/600?random=2",
    aiHint: "community park"
  },
  {
    title: "New Recycling Center",
    description: "A new center is now open in your area.",
    image: "https://picsum.photos/1200/600?random=3",
    aiHint: "recycling center"
  },
];

export function PromoCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  
  React.useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section aria-labelledby="promotions-heading">
      <h2 id="promotions-heading" className="sr-only">What's New</h2>
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {promotions.map((promo, index) => (
            <CarouselItem key={index}>
              <Card className="overflow-hidden shadow-lg rounded-2xl">
                <CardContent className="relative p-0 aspect-[16/9]">
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    className="object-cover"
                    data-ai-hint={promo.aiHint}
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold">{promo.title}</h3>
                    <p className="mt-2 max-w-lg text-base md:text-lg">{promo.description}</p>
                    <Button className="mt-4 bg-accent text-accent-foreground font-semibold px-6 py-2 rounded-full shadow-md hover:bg-accent/90 transition-all duration-200 ease-in-out">
                      Join Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 hidden sm:inline-flex" />
        <CarouselNext className="right-4 hidden sm:inline-flex" />
      </Carousel>
    </section>
  );
}
