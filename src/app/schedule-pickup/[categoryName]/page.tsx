
'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// In a real app, this data would come from a database or a config file
const categoryData: { [key: string]: any } = {
  'Plastic Bottles': {
    imgSrc: '/assets/category-bottles.svg',
    cleanPrice: '2,000',
    dirtyPrice: '1,500',
    benefits: [
      'Reduces landfill waste and ocean pollution.',
      'Saves energy compared to producing new plastic.',
      'Can be recycled into new bottles, clothing fibers, and more.',
    ],
  },
  'Paper': {
    imgSrc: '/assets/category-paper.svg',
    cleanPrice: '1,000',
    dirtyPrice: '700',
    benefits: [
        'Saves trees and reduces deforestation.',
        'Uses significantly less water and energy than making new paper.',
        'Reduces greenhouse gas emissions.',
    ],
  },
    'Cardboard': {
    imgSrc: '/assets/category-cardboard.svg',
    cleanPrice: '800',
    dirtyPrice: '500',
    benefits: [
        'Highly recyclable and can be repurposed multiple times.',
        'Reduces the need for virgin wood pulp.',
        'Breaks down much faster than plastic.',
    ],
  },
  'Glass': {
    imgSrc: '/assets/category-glass.svg',
    cleanPrice: '1,200',
    dirtyPrice: '900',
    benefits: [
        'Infinitely recyclable without loss of quality.',
        'Reduces sand extraction and saves natural resources.',
        'Lowers energy consumption in manufacturing.',
    ],
  },
  'Aluminum Cans': {
    imgSrc: '/assets/category-cans.svg',
    cleanPrice: '10,000',
    dirtyPrice: '8,000',
    benefits: [
        'Recycling aluminum saves up to 95% of the energy needed to make it from scratch.',
        'One of the most valuable recyclable materials.',
        'Can be back on the shelf as a new can in just 60 days.',
    ],
  },
    'Electronics': {
    imgSrc: '/assets/category-electronics.svg',
    cleanPrice: 'Varies',
    dirtyPrice: 'Varies',
    benefits: [
        'Prevents hazardous materials like lead and mercury from contaminating the environment.',
        'Recovers valuable materials like gold, silver, and copper.',
        'Reduces the need for mining raw materials.',
    ],
  },
};

export default function SchedulePickupPage() {
  const router = useRouter();
  const params = useParams();
  const categoryName = decodeURIComponent(params.categoryName as string);
  const data = categoryData[categoryName];

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Category not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="p-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} aria-label="Go back">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold">Schedule Pickup</h1>
      </div>

      <main className="px-4 pb-24 flex flex-col gap-6">
        {/* Category Image */}
        <div className="flex justify-center bg-primary/5 p-8 rounded-2xl">
          <Image src={data.imgSrc} alt={categoryName} width={128} height={128} />
        </div>

        {/* Pricing Info */}
        <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-sm text-muted-foreground">Clean Price</p>
                <p className="font-bold text-primary">Rp. {data.cleanPrice} / kg</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-sm text-muted-foreground">Dirty Price</p>
                <p className="font-bold text-primary">Rp. {data.dirtyPrice} / kg</p>
            </div>
        </div>

        {/* User Input Section */}
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="photo">Upload Item Photo</Label>
            <div className="relative">
                <Input type="file" id="photo" className="w-full h-12 pl-12" />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Image src="/assets/upload-icon.svg" alt="Upload" width={24} height={24} />
                </div>
            </div>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="weight">Estimated Weight (kg)</Label>
            <Input type="number" id="weight" placeholder="e.g., 5" className="h-12" />
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <h2 className="font-bold mb-2">Benefits & Tips</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                {data.benefits.map((tip: string, index: number) => (
                    <li key={index}>{tip}</li>
                ))}
            </ul>
        </div>

        {/* CTA Button */}
        <Button size="lg" className="w-full h-14 text-base bg-accent hover:bg-accent/90">
          Schedule Pickup
        </Button>
      </main>
    </div>
  );
}
