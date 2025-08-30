
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';

export default function ReferralPage() {
  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Referral" showBackButton={true} />
      <main className="p-4 pt-20">
        <p>Referral content goes here.</p>
      </main>
    </div>
  );
}
