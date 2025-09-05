
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const events = [
  {
    name: 'Park Cleanup Drive',
    date: 'Saturday, Nov 11, 2023',
    location: 'City Park',
    description: 'Join us for a community effort to clean up our local park. Gloves and bags will be provided.',
    image: 'https://picsum.photos/400/250?random=7',
    aiHint: 'community park cleanup',
  },
  {
    name: 'Recycling Workshop for Kids',
    date: 'Sunday, Nov 19, 2023',
    location: 'Community Center',
    description: 'A fun and interactive workshop to teach children the importance of recycling.',
    image: 'https://picsum.photos/400/250?random=8',
    aiHint: 'kids workshop',
  },
];

export default function CommunityPage() {
  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Community Events" />
      <main className="p-4 space-y-6">
         <div className="text-center mb-2">
            <h2 className="text-xl font-bold">Join an Event</h2>
            <p className="text-muted-foreground">Get involved and make an impact with your community.</p>
        </div>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.name} className="overflow-hidden rounded-xl border bg-card">
                 <div className="relative h-48 w-full">
                    <Image src={event.image} alt={event.name} fill className="object-cover" data-ai-hint={event.aiHint} />
                </div>
              <div className="p-4">
                <h3 className="font-semibold">{event.name}</h3>
                <p className="text-sm text-muted-foreground">{event.date} • {event.location}</p>
                <p className="text-sm text-muted-foreground my-3">{event.description}</p>
                <Button className="w-full">RSVP Now</Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
