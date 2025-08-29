"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FilterBar } from "./FilterBar";
import useUIState from "@/hooks/useUIState";
import { Button } from "../ui/button";

const allCategories = [
  {
    name: "Plastics",
    description: "Bottles, containers, jugs.",
    points: "10 PTS/item",
    image: "https://picsum.photos/400/300?random=4",
    aiHint: "plastic bottles",
    tags: ["All", "Bottles", "Plastics"]
  },
  {
    name: "Paper",
    description: "Newspapers, magazines.",
    points: "5 PTS/lb",
    image: "https://picsum.photos/400/300?random=5",
    aiHint: "stack paper",
    tags: ["All", "Paper", "Cardboard"]
  },
  {
    name: "Glass",
    description: "Jars and bottles of any color.",
    points: "15 PTS/item",
    image: "https://picsum.photos/400/300?random=6",
    aiHint: "glass jars",
    tags: ["All", "Glass", "Bottles"]
  },
  {
    name: "Electronics",
    description: "Old phones, chargers.",
    points: "50-200 PTS/item",
    image: "https://picsum.photos/400/300?random=7",
    aiHint: "old electronics",
    tags: ["All", "Non-Organic"]
  },
  {
    name: "Aluminum",
    description: "Soda, beer, beverage cans.",
    points: "5 PTS/can",
    image: "https://picsum.photos/400/300?random=8",
    aiHint: "aluminum cans",
    tags: ["All", "Cans", "Aluminum"]
  },
  {
    name: "Organic",
    description: "Food scraps, yard trimmings.",
    points: "2 PTS/lb",
    image: "https://picsum.photos/400/300?random=9",
    aiHint: "compost bin",
    tags: ["All", "Organic"]
  },
];

export function WasteCategories() {
  const activeFilter = useUIState(state => state.activeFilter);

  const filteredCategories = allCategories.filter(category =>
    category.tags.includes(activeFilter)
  );

  return (
    <section aria-labelledby="waste-categories-heading">
      <div className="flex items-center justify-between mb-4">
        <h2 id="waste-categories-heading" className="text-xl font-bold">Categories</h2>
        <Button variant="link" size="sm" className="text-accent h-auto p-0">See All</Button>
      </div>
      <div className="mb-4">
        <FilterBar />
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold">Items</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {filteredCategories.map((category) => (
          <Card key={category.name} className="flex flex-col overflow-hidden shadow-md rounded-2xl transition-transform duration-200 ease-in-out hover:shadow-lg hover:scale-105 active:scale-95">
            <CardHeader className="p-0">
              <div className="relative aspect-4/3 w-full">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                  data-ai-hint={category.aiHint}
                />
              </div>
            </CardHeader>
            <CardContent className="p-3 flex flex-col flex-grow bg-white">
              <CardTitle className="text-sm font-bold">{category.name}</CardTitle>
              <CardDescription className="mt-1 flex-grow text-xs">{category.description}</CardDescription>
              <p className="mt-2 text-primary font-bold text-xs">{category.points}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
