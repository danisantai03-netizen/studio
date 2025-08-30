
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';

export default function SecurityPage() {
  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Security" showBackButton={true} />
      <main className="p-4 pt-20">
        <p>Security content goes here.</p>
      </main>
    </div>
  );
}
