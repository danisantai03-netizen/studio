"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FilterBar } from "./FilterBar";
import useUIState from "@/hooks/useUIState";

const allCategories = [
  {
    name: "Plastics",
    description: "Bottles, containers, and jugs.",
    points: "10 PTS/item",
    image: "https://picsum.photos/400/300?random=4",
    aiHint: "plastic bottles",
    tags: ["All", "Bottles", "Plastics"]
  },
  {
    name: "Paper & Cardboard",
    description: "Newspapers, magazines, and boxes.",
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
    description: "Old phones, chargers, and batteries.",
    points: "50-200 PTS/item",
    image: "https://picsum.photos/400/300?random=7",
    aiHint: "old electronics",
    tags: ["All", "Non-Organic"]
  },
  {
    name: "Aluminum Cans",
    description: "Soda, beer, and other beverage cans.",
    points: "5 PTS/can",
    image: "https://picsum.photos/400/300?random=8",
    aiHint: "aluminum cans",
    tags: ["All", "Cans", "Aluminum"]
  },
  {
    name: "Organic Waste",
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
      <div className="mb-4">
        <h2 id="waste-categories-heading" className="text-2xl font-bold">Categories</h2>
      </div>
      <div className="mb-6">
        <FilterBar />
      </div>
      <div className="mb-4">
        <h3 className="text-2xl font-bold">Items</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {filteredCategories.map((category) => (
          <Card key={category.name} className="flex flex-col overflow-hidden shadow-md rounded-2xl active:bg-card/80 transition-all duration-200 ease-in-out">
            <CardHeader className="p-0">
              <div className="relative aspect-square w-full">
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
              <CardTitle className="text-base font-bold">{category.name}</CardTitle>
              <CardDescription className="mt-1 flex-grow text-xs">{category.description}</CardDescription>
              <p className="mt-2 text-primary font-bold text-sm">{category.points}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
