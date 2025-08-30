
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  {
    name: 'Plastic Bottles',
    imgSrc: '/assets/category-bottles.svg',
  },
  {
    name: 'Paper',
    imgSrc: '/assets/category-paper.svg',
  },
  {
    name: 'Cardboard',
    imgSrc: '/assets/category-cardboard.svg',
  },
  {
    name: 'Glass',
    imgSrc: '/assets/category-glass.svg',
  },
  {
    name: 'Aluminum Cans',
    imgSrc: '/assets/category-cans.svg',
  },
  {
    name: 'Electronics',
    imgSrc: '/assets/category-electronics.svg',
  },
];

function CategoryCard({ name, imgSrc }: { name: string; imgSrc: string }) {
  return (
    <Link href={`/schedule-pickup/${encodeURIComponent(name)}`} className="block group">
      <Card className="overflow-hidden shadow-sm rounded-2xl transition-all duration-200 ease-in-out group-hover:shadow-lg group-hover:scale-105 active:scale-95 border-gray-200/50">
        <CardContent className="p-4 flex flex-col items-center justify-center gap-3 text-center aspect-square">
          <div className="flex-grow flex items-center justify-center">
            <Image src={imgSrc} alt={name} width={64} height={64} />
          </div>
          <p className="font-semibold text-sm text-foreground">{name}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export function CategoryGrid() {
  return (
    <section className="p-4">
      <h2 className="text-xl font-bold mb-4">Select Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.name} {...category} />
        ))}
      </div>
    </section>
  );
}
