
"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useUIState from "@/hooks/useUIState";
import Link from 'next/link';

const allCategories = [
  {
    name: "PET Bottles",
    description: "Clear plastic bottles.",
    points: "20 PTS/item",
    image: "/assets/categories/plastics.svg",
    aiHint: "plastic bottles",
    tags: ["All", "Plastics"],
    category: "Plastic Bottles"
  },
  {
    name: "Newspapers",
    description: "Daily and weekly papers.",
    points: "5 PTS/lb",
    image: "/assets/categories/paper.svg",
    aiHint: "stack paper",
    tags: ["All", "Paper"],
    category: "Paper"
  },
  {
    name: "Glass Jars",
    description: "Food jars, colored bottles.",
    points: "15 PTS/item",
    image: "/assets/categories/glass.svg",
    aiHint: "glass jars",
    tags: ["All", "Glass"],
    category: "Glass"
  },
  {
    name: "Old Phones",
    description: "Smartphones, feature phones.",
    points: "150 PTS/item",
    image: "/assets/categories/electronics.svg",
    aiHint: "old electronics",
    tags: ["All", "Electronics"],
    category: "Electronics"
  },
  {
    name: "Soda Cans",
    description: "Aluminum beverage cans.",
    points: "5 PTS/can",
    image: "/assets/categories/aluminum.svg",
    aiHint: "aluminum cans",
    tags: ["All", "Aluminum", "Metal"],
    category: "Aluminum Cans"
  },
  {
    name: "Food Scraps",
    description: "Vegetable peels, coffee grounds.",
    points: "2 PTS/lb",
    image: "/assets/categories/organic.svg",
aiHint: "compost bin",
    tags: ["All", "Organic"],
    category: "Organic"
  },
  {
    name: "HDPE Containers",
    description: "Milk jugs, detergent bottles.",
    points: "15 PTS/item",
    image: "/assets/categories/plastics.svg",
    aiHint: "plastic containers",
    tags: ["All", "Plastics"],
    category: "Plastic Bottles"
  },
  {
    name: "Cardboard",
    description: "Shipping boxes, packaging.",
    points: "8 PTS/lb",
    image: "/assets/categories/paper.svg",
    aiHint: "cardboard boxes",
    tags: ["All", "Paper", "Cardboard"],
    category: "Cardboard"
  }
];

export function WasteCategories() {
  const activeFilter = useUIState(state => state.activeFilter);

  const filteredCategories = allCategories.filter(category =>
    category.tags.includes(activeFilter)
  );

  return (
    <section aria-labelledby="waste-categories-heading">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {filteredCategories.map((category) => (
          <Link key={category.name} href={`/schedule-pickup/${encodeURIComponent(category.category)}`} className="block group">
            <Card className="flex flex-col overflow-hidden shadow-sm rounded-xl transition-all duration-200 ease-in-out hover:shadow-md active:scale-95 border-gray-200/50 h-full">
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
              <CardContent className="p-2.5 flex flex-col flex-grow bg-card">
                <CardTitle className="text-sm font-bold">{category.name}</CardTitle>
                <CardDescription className="mt-0.5 flex-grow text-xs text-muted-foreground">{category.description}</CardDescription>
                <p className="mt-1.5 text-primary font-bold text-xs">{category.points}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
