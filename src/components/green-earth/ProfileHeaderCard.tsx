
'use client';

import * as React from 'react';
import Image from 'next/image';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useUserStore from '@/hooks/useUserStore';

export function ProfileHeaderCard() {
  const { name, avatarUrl } = useUserStore();

  return (
    <div className="bg-primary text-primary-foreground rounded-2xl shadow-lg p-4">
      <div className="flex items-center gap-4">
        {/* Left Side: Avatar */}
        <div className="relative flex-shrink-0">
          <Image
            src={avatarUrl}
            alt={name}
            width={64}
            height={64}
            className="rounded-full border-2 border-white/50"
          />
        </div>

        {/* Center: User Info */}
        <div className="flex-grow">
          <h2 className="text-xl font-bold text-white">{name}</h2>
          <p className="text-xs text-white/80 mt-0.5">ID: 1289-4720-3482</p>
        </div>

        {/* Right Side: Edit Button */}
        <div className="flex-shrink-0">
          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/20 hover:text-white rounded-full"
            aria-label="Edit profile"
          >
            <Pencil className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
