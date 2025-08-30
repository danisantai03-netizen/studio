
'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// In a real app, this data would come from a database or a config file
const categoryData: { [key: string]: any } = {
  'Plastic Bottles': {
    imgSrc: '/assets/categories/plastics.svg',
    cleanPrice: 2000,
    dirtyPrice: 1500,
    benefits: [
      'Reduces landfill waste and ocean pollution.',
      'Saves energy compared to producing new plastic.',
      'Can be recycled into new bottles, clothing fibers, and more.',
    ],
  },
  'Paper': {
    imgSrc: '/assets/categories/paper.svg',
    cleanPrice: 1000,
    dirtyPrice: 700,
    benefits: [
        'Saves trees and reduces deforestation.',
        'Uses significantly less water and energy than making new paper.',
        'Reduces greenhouse gas emissions.',
    ],
  },
    'Cardboard': {
    imgSrc: '/assets/categories/paper.svg',
    cleanPrice: 800,
    dirtyPrice: 500,
    benefits: [
        'Highly recyclable and can be repurposed multiple times.',
        'Reduces the need for virgin wood pulp.',
        'Breaks down much faster than plastic.',
    ],
  },
  'Glass': {
    imgSrc: '/assets/categories/glass.svg',
    cleanPrice: 1200,
    dirtyPrice: 900,
    benefits: [
        'Infinitely recyclable without loss of quality.',
        'Reduces sand extraction and saves natural resources.',
        'Lowers energy consumption in manufacturing.',
    ],
  },
  'Aluminum Cans': {
    imgSrc: '/assets/categories/aluminum.svg',
    cleanPrice: 10000,
    dirtyPrice: 8000,
    benefits: [
        'Recycling aluminum saves up to 95% of the energy needed to make it from scratch.',
        'One of the most valuable recyclable materials.',
        'Can be back on the shelf as a new can in just 60 days.',
    ],
  },
    'Electronics': {
    imgSrc: '/assets/categories/electronics.svg',
    cleanPrice: 0, // Varies
    dirtyPrice: 0, // Varies
    benefits: [
        'Prevents hazardous materials like lead and mercury from contaminating the environment.',
        'Recovers valuable materials like gold, silver, and copper.',
        'Reduces the need for mining raw materials.',
    ],
  },
   'Organic': {
    imgSrc: '/assets/categories/organic.svg',
    cleanPrice: 300,
    dirtyPrice: 100,
    benefits: [
        'Creates nutrient-rich compost for soil.',
        'Reduces methane emissions from landfills.',
        'Improves soil structure and water retention.',
    ],
  }
};

export default function SchedulePickupPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const categoryName = decodeURIComponent(params.categoryName as string);
  const data = categoryData[categoryName];

  const [weight, setWeight] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const estimatedEarnings = useMemo(() => {
    const numericWeight = parseFloat(weight);
    if (!data || !numericWeight || isNaN(numericWeight) || numericWeight <= 0) {
      return 0;
    }
    return numericWeight * data.cleanPrice;
  }, [weight, data]);
  
  const handleSchedule = () => {
     toast({
        title: "Pickup Scheduled!",
        description: `Your pickup for ${categoryName} has been confirmed.`,
    });
    router.push('/');
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Category not found.</p>
      </div>
    );
  }
  
  const displayCleanPrice = data.cleanPrice > 0 ? `Rp. ${data.cleanPrice.toLocaleString('id-ID')} / kg` : 'Varies';
  const displayDirtyPrice = data.dirtyPrice > 0 ? `Rp. ${data.dirtyPrice.toLocaleString('id-ID')} / kg` : 'Varies';


  return (
    <div className="bg-background min-h-screen">
      <div className="p-4 flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()} aria-label="Go back">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold">Schedule Pickup</h1>
      </div>

      <main className="px-4 pb-24 flex flex-col gap-6">
        {/* Category Image */}
        <div className="relative aspect-video max-h-64 mx-auto w-full">
          <Image src={data.imgSrc} alt={categoryName} fill className="object-contain" />
        </div>

        {/* Pricing Info */}
        <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-sm text-muted-foreground">Clean Price</p>
                <p className="font-bold text-primary">{displayCleanPrice}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-sm text-muted-foreground">Dirty Price</p>
                <p className="font-bold text-primary">{displayDirtyPrice}</p>
            </div>
        </div>

        {/* User Input Section */}
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="photo">Upload Item Photo</Label>
            <div className="flex items-center gap-4">
                <label htmlFor="photo-upload" className="relative cursor-pointer">
                    <div className="w-24 h-24 rounded-lg bg-white shadow-sm flex items-center justify-center border-2 border-dashed">
                        {imagePreview ? (
                            <Image src={imagePreview} alt="Item preview" fill className="object-cover rounded-lg" />
                        ) : (
                             <Camera className="w-8 h-8 text-muted-foreground" />
                        )}
                    </div>
                </label>
                <Input type="file" id="photo-upload" accept="image/*" className="hidden" onChange={handleImageChange} />
                <p className="text-xs text-muted-foreground flex-1">
                    Please upload a clear photo of your items.
                </p>
            </div>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="weight">Estimated Weight (kg)</Label>
            <Input 
                type="number" 
                id="weight" 
                placeholder="e.g., 5" 
                className="h-12" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                min="0"
            />
          </div>
           {estimatedEarnings > 0 && (
            <div className="bg-primary/5 p-3 rounded-xl text-center">
              <p className="text-sm text-primary font-medium">
                Estimated Earnings: <span className="font-bold">Rp. {estimatedEarnings.toLocaleString('id-ID')}</span>
              </p>
            </div>
          )}
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
        <Button size="lg" className="w-full h-14 text-base bg-accent hover:bg-accent/90" onClick={handleSchedule}>
          Schedule Pickup
        </Button>
      </main>
    </div>
  );
}
