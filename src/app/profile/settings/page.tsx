
'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="bg-background min-h-screen">
      <header className="p-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold">Settings</h1>
      </header>
      <main className="p-4">
        <p>Settings content goes here.</p>
      </main>
    </div>
  );
}
