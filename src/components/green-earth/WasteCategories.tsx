"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FilterBar } from "./FilterBar";
import { useState } from "react";

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
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredCategories = allCategories.filter(category =>
    category.tags.includes(activeFilter)
  );

  return (
    <section aria-labelledby="waste-categories-heading">
      <div className="px-4">
        <h2 id="waste-categories-heading" className="text-2xl font-bold mb-4">Items</h2>
      </div>
      <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <div className="px-4 grid grid-cols-2 gap-4">
        {filteredCategories.map((category) => (
          <Card key={category.name} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                  data-ai-hint={category.aiHint}
                />
              </div>
            </CardHeader>
            <CardContent className="p-3 flex flex-col flex-grow">
              <CardTitle className="text-base">{category.name}</CardTitle>
              <CardDescription className="mt-1 flex-grow text-xs">{category.description}</CardDescription>
              <p className="mt-2 text-primary font-bold text-sm">{category.points}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
