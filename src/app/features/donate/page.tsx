
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const causes = [
  {
    name: 'Reforestation Project',
    description: 'Help plant trees in critical ecosystems to combat climate change.',
    image: 'https://picsum.photos/400/300?random=1',
    aiHint: 'forest trees',
  },
  {
    name: 'Ocean Cleanup Initiative',
    description: 'Fund operations to remove plastic waste from our oceans and protect marine life.',
    image: 'https://picsum.photos/400/300?random=2',
    aiHint: 'ocean cleanup',
  },
  {
    name: 'Wildlife Conservation Fund',
    description: 'Support efforts to protect endangered species and their natural habitats.',
    image: 'https://picsum.photos/400/300?random=3',
    aiHint: 'wildlife conservation',
  },
];

export default function DonatePage() {
  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Donate" showBackButton={true} />
      <main className="p-4 space-y-4">
        <div className="text-center mb-6">
            <h2 className="text-xl font-bold">Support a Cause</h2>
            <p className="text-muted-foreground">Use your earnings to make a difference.</p>
        </div>
        <div className="space-y-4">
          {causes.map((cause) => (
            <Card key={cause.name} className="overflow-hidden">
                <div className="relative h-40 w-full">
                    <Image src={cause.image} alt={cause.name} fill className="object-cover" data-ai-hint={cause.aiHint} />
                </div>
                <CardHeader>
                    <CardTitle>{cause.name}</CardTitle>
                    <CardDescription>{cause.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full">Donate Now</Button>
                </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
