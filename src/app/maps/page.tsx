
'use client';

import { BottomNav } from '@/components/green-earth/BottomNav';
import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, LocateFixed, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';

export default function MapsPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <UniversalHeader title="Find Recycling Centers" showBackButton={false} />

      {/* Map Content */}
      <main className="flex-grow flex flex-col relative">
        {/* Search and Filter Bar */}
        <div className="px-3 py-2 space-y-2 bg-background z-10">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search by location or name..."
              className="h-10 pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex-1 bg-white shadow-sm">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="bg-white shadow-sm">
              <LocateFixed className="w-4 h-4 mr-2" />
              Near Me
            </Button>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="flex-grow relative">
          <Image
            src="https://picsum.photos/800/1200?grayscale"
            alt="Map of recycling centers"
            fill
            className="object-cover"
            data-ai-hint="map"
          />
          <div className="absolute inset-0 bg-gray-400/20" />
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
