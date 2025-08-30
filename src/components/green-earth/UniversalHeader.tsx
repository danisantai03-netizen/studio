
'use client';

import *d React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface UniversalHeaderProps {
  title: string;
  showBackButton?: boolean;
}

export function UniversalHeader({ title, showBackButton = true }: UniversalHeaderProps) {
  const router = useRouter();

  return (
    <header className="relative flex h-14 items-center gap-4 bg-background px-4">
      {showBackButton && (
        <button onClick={() => router.back()} className="p-2 -ml-2">
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Go back</span>
        </button>
      )}
      <h1 className="text-lg font-bold text-foreground">{title}</h1>
    </header>
  );
}
