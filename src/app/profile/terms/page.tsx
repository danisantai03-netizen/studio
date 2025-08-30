
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';

export default function TermsPage() {
  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Terms & Conditions" showBackButton={true} />
      <main className="p-4 pt-20">
        <p>Terms & Conditions content goes here.</p>
      </main>
    </div>
  );
}
