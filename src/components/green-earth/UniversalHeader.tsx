
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface UniversalHeaderProps {
  title: string;
  showBackButton?: boolean;
  children?: React.ReactNode;
}

export function UniversalHeader({ title, showBackButton = true, children }: UniversalHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm border-b">
      <div className="h-12 flex items-center px-4 relative">
         <div className="w-14 flex justify-start">
           {showBackButton && (
            <button onClick={() => router.back()} className="p-2 -ml-2 text-foreground">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Go back</span>
            </button>
           )}
         </div>
        <h1 className="flex-1 text-center text-base font-semibold text-foreground truncate">{title}</h1>
        <div className="w-14 flex justify-end" >
          {children}
        </div>
      </div>
    </header>
  );
}
