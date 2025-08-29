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
    description: "Recycle any electronics this week and earn double points!",
    image: "https://picsum.photos/1200/600?random=1",
    aiHint: "electronics recycling"
  },
  {
    title: "Community Cleanup Drive",
    description: "Join us this Saturday for a local park cleanup event.",
    image: "https://picsum.photos/1200/600?random=2",
    aiHint: "community park"
  },
  {
    title: "New Recycling Center",
    description: "A new center is now open in your area. Find out more!",
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
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section aria-labelledby="promotions-heading">
      <h2 id="promotions-heading" className="text-2xl font-bold mb-4">What's New</h2>
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {promotions.map((promo, index) => (
            <CarouselItem key={index}>
              <Card className="overflow-hidden shadow-lg">
                <CardContent className="relative p-0 aspect-[2/1]">
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    className="object-cover"
                    data-ai-hint={promo.aiHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-xl md:text-2xl font-bold">{promo.title}</h3>
                    <p className="mt-2 max-w-lg text-sm md:text-base">{promo.description}</p>
                    <Button variant="secondary" className="mt-4">Learn More</Button>
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
