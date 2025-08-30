
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';

export default function FeedbackPage() {
  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Help & Feedback" showBackButton={true} />
      <main className="p-4">
        <p>Help & Feedback content goes here.</p>
      </main>
    </div>
  );
}
