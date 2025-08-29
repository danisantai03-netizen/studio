import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const categories = [
  {
    name: "Plastics",
    description: "Bottles, containers, and jugs.",
    points: "10 PTS/item",
    image: "https://picsum.photos/400/300?random=4",
    aiHint: "plastic bottles"
  },
  {
    name: "Paper & Cardboard",
    description: "Newspapers, magazines, and boxes.",
    points: "5 PTS/lb",
    image: "https://picsum.photos/400/300?random=5",
    aiHint: "stack paper"
  },
  {
    name: "Glass",
    description: "Jars and bottles of any color.",
    points: "15 PTS/item",
    image: "https://picsum.photos/400/300?random=6",
    aiHint: "glass jars"
  },
  {
    name: "Electronics",
    description: "Old phones, chargers, and batteries.",
    points: "50-200 PTS/item",
    image: "https://picsum.photos/400/300?random=7",
    aiHint: "old electronics"
  },
];

export function WasteCategories() {
  return (
    <section aria-labelledby="waste-categories-heading">
      <h2 id="waste-categories-heading" className="text-2xl font-bold mb-4">Recycle & Earn</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Card key={category.name} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={400}
                  height={300}
                  className="object-cover"
                  data-ai-hint={category.aiHint}
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 flex flex-col flex-grow">
              <CardTitle className="text-lg">{category.name}</CardTitle>
              <CardDescription className="mt-1 flex-grow">{category.description}</CardDescription>
              <p className="mt-4 text-primary font-bold">{category.points}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
