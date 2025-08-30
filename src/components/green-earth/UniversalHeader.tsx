
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UniversalHeaderProps {
  title: string;
  showBackButton?: boolean;
}

export function UniversalHeader({ title, showBackButton = true }: UniversalHeaderProps) {
  const router = useRouter();

  return (
    <header className="flex h-14 items-center gap-4 bg-background px-4">
      {showBackButton && (
        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Go back</span>
        </Button>
      )}
      <h1 className="text-lg font-bold text-foreground">{title}</h1>
    </header>
  );
}
