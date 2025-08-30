
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';

export default function HistoryPage() {
  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Transaction History" showBackButton={true} />
      <main className="p-4">
        <p>Transaction History content goes here.</p>
      </main>
    </div>
  );
}
