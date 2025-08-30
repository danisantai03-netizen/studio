
'use client';

import { UniversalHeader } from '@/components/green-earth/UniversalHeader';

export default function SettingsPage() {
  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Settings" showBackButton={true} />
      <main className="p-4 pt-20">
        <p>Settings content goes here.</p>
      </main>
    </div>
  );
}
