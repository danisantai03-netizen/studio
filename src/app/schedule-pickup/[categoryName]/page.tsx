
'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Camera, Info, TrendingUp, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SuccessAnimation } from '@/components/green-earth/SuccessAnimation';
import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    lastMonthPrice: 1800,
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
    lastMonthPrice: 950,
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
    lastMonthPrice: 750,
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
    lastMonthPrice: 1100,
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
    lastMonthPrice: 9500,
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
    lastMonthPrice: null,
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
    lastMonthPrice: 250,
  }
};

const PriceTooltip = ({ content }: { content: React.ReactNode }) => (
  <TooltipProvider delayDuration={200}>
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" className="ml-1.5 text-muted-foreground hover:text-primary">
          <Info className="w-3.5 h-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-center" side="top">
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);


export default function SchedulePickupPage() {
  const router = useRouter();
  const params = useParams();
  const categoryName = decodeURIComponent(params.categoryName as string);
  const data = categoryData[categoryName];

  const [weight, setWeight] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
     setIsSubmitted(true);
  }
  
  const onAnimationComplete = () => {
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
    <div className="bg-background min-h-screen relative">
       {isSubmitted && (
         <SuccessAnimation
            onComplete={onAnimationComplete}
            message="Pickup Scheduled!"
         />
       )}
      <UniversalHeader title="Schedule Pickup" showBackButton={true} />

      <main className="p-4 pb-24 flex flex-col gap-6">
        {/* Category Image */}
        <div className="relative aspect-video max-h-48 mx-auto w-full">
            <Image 
                src={data.imgSrc} 
                alt={categoryName} 
                fill 
                className="object-contain"
            />
        </div>

        {/* Pricing Info */}
        <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-card p-4 rounded-xl shadow-sm">
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                    <span>Clean Price</span>
                    <PriceTooltip content="Items are clean, sorted, and match the category. E.g., clean plastic bottles without labels." />
                </div>
                <p className="font-bold text-primary mt-1">{displayCleanPrice}</p>
            </div>
            <div className="bg-card p-4 rounded-xl shadow-sm">
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                    <span>Dirty Price</span>
                    <PriceTooltip content="Items are mixed, dirty, or have labels/contaminants. E.g., bottles with liquid inside." />
                </div>
                <p className="font-bold text-primary mt-1">{displayDirtyPrice}</p>
            </div>
        </div>

        {/* User Input Section */}
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="photo">Upload Item Photo</Label>
            <div className="flex items-center gap-4">
                <label htmlFor="photo-upload" className="relative cursor-pointer">
                    <div className="w-24 h-24 rounded-lg bg-card shadow-sm flex items-center justify-center border-2 border-dashed">
                        {imagePreview ? (
                            <Image src={imagePreview} alt="Item preview" fill className="object-cover rounded-lg" />
                        ) : (
                             <Camera className="w-8 h-8 text-muted-foreground" />
                        )}
                    </div>
                </label>
                <Input type="file" id="photo-upload" accept="image/*" className="hidden" onChange={handleImageChange} />
                <p className="text-xs text-muted-foreground flex-1">
                    Upload clear photos of your items. Clear photos help us verify category and speed up pickup approval.
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
            <div className="bg-primary/5 p-3 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Estimated Weight</span>
                    <span className="font-medium">{parseFloat(weight).toLocaleString('id-ID')} kg</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Price per kg</span>
                    <span className="font-medium">Rp. {data.cleanPrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between items-center text-base">
                    <span className="font-semibold text-primary">Estimated Earnings</span>
                    <span className="font-bold text-primary">Rp. {estimatedEarnings.toLocaleString('id-ID')}</span>
                </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-secondary-dark">+ Reward Points</span>
                    <span className="font-semibold text-secondary-dark">{Math.floor(estimatedEarnings / 100).toLocaleString('id-ID')} pts</span>
                </div>
            </div>
          )}
           {estimatedEarnings > 0 && (
             <p className="text-xs text-muted-foreground text-center px-4">
                This is only an estimate. Final earnings will be based on actual verified weight and item condition at pickup.
            </p>
           )}
        </div>

        {/* Benefits Section */}
        <div className="bg-card p-4 rounded-xl shadow-sm">
            <h2 className="font-bold mb-3">Benefits & Tips</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                {data.benefits.map((tip: string, index: number) => (
                    <li key={index}>{tip}</li>
                ))}
            </ul>
             {data.lastMonthPrice && (
                 <div className="mt-4 pt-3 border-t border-dashed">
                     <div className="flex items-center gap-2 text-xs text-muted-foreground">
                         <TrendingUp className="w-4 h-4 text-secondary"/>
                         <span>Last month’s average price for {categoryName.toLowerCase()} was <b>Rp {data.lastMonthPrice.toLocaleString('id-ID')}/kg</b>.</span>
                     </div>
                 </div>
             )}
        </div>

        {/* Security Note */}
         <div className="bg-card p-4 rounded-xl shadow-sm">
             <div className="flex items-center gap-3">
                 <Wallet className="w-6 h-6 text-primary" />
                 <p className="flex-1 text-xs text-muted-foreground">
                     All confirmed transactions will be recorded in your wallet. You can withdraw your balance anytime to your eWallet.
                 </p>
             </div>
        </div>

        {/* CTA Button */}
        <div className="pt-2">
            <Button size="lg" className="w-full h-14 text-base" onClick={handleSchedule} disabled={isSubmitted}>
              Schedule Pickup
            </Button>
        </div>
      </main>
    </div>
  );
}

