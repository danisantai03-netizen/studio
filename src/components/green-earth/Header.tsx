
"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatPointsAsCurrency } from "@/lib/utils";
import { Notifications } from "./Notifications";
import { Button } from "../ui/button";

export function Header() {
  const [points, setPoints] = React.useState(1370);

  // Simulate real-time point updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prevPoints) => prevPoints + Math.floor(Math.random() * 10));
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative bg-background">
      <div className="absolute top-0 left-0 right-0 h-32 bg-primary/90 rounded-b-3xl -z-0" />
      <div className="relative z-10 px-4 pt-4 pb-2">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
              <AvatarImage
                src="https://picsum.photos/48/48"
                alt="Alex Green"
                data-ai-hint="profile person"
              />
              <AvatarFallback>AG</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-white/80">Welcome back 👋</p>
              <h1 className="text-base font-bold text-white">Alex Green</h1>
            </div>
          </div>
          <Notifications />
        </div>

        {/* New Points Card Implementation */}
        <div
          className="bg-primary text-primary-foreground rounded-2xl p-4 shadow-lg border border-primary/50 w-full font-sans antialiased"
          key={points}
        >
          <div className="flex justify-between items-center">
            {/* Points Info */}
            <div
              className="transition-transform duration-200 ease-in-out"
              aria-live="polite"
            >
              <div className="flex items-baseline gap-2">
                 <p className="text-2xl font-bold text-white leading-none">
                    {points.toLocaleString('id-ID')}
                </p>
                <p className="text-sm font-medium text-primary-foreground/80 leading-5">Points</p>
              </div>
              <p className="text-xs text-primary-foreground/80 opacity-90 mt-1">
                {formatPointsAsCurrency(points)}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
                 <button className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground/90 text-xs font-medium px-4 py-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring/50 focus:ring-opacity-30 active:scale-95">
                    History
                </button>
                <button className="bg-accent hover:bg-accent/90 text-accent-foreground text-xs font-medium px-4 py-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/70 focus:ring-opacity-50 active:scale-95">
                    Redeem
                </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
