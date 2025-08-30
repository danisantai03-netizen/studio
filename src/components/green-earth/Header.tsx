
"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from 'lucide-react';
import Link from "next/link";

export function Header() {

  return (
    <header className="relative bg-background p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
              <AvatarImage
                src="https://picsum.photos/48/48"
                alt="Alex Green"
                data-ai-hint="profile person"
              />
              <AvatarFallback>AG</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">Welcome back,</p>
              <h1 className="text-lg font-bold text-foreground">Alex Green</h1>
            </div>
          </div>
          <Link
            href="/notifications"
            aria-label={`Notifications`}
            className="relative p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-ring"
            >
            <Bell className="h-6 w-6 text-gray-500" />
        </Link>
        </div>
    </header>
  );
}
