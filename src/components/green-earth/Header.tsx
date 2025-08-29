
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { History, Gift } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Notifications } from "./Notifications";
import { formatPointsAsCurrency } from "@/lib/utils";


export function Header() {
  const [points, setPoints] = React.useState(1250);

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
              <AvatarImage src="https://picsum.photos/48/48" alt="Alex Green" data-ai-hint="profile person" />
              <AvatarFallback>AG</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-base font-bold text-white">Alex Green</h1>
              <p className="text-sm text-white/80">Welcome back 👋</p>
            </div>
          </div>
          <Notifications />
        </div>
        <Card className="shadow-lg rounded-2xl bg-primary text-primary-foreground w-full max-w-md mx-auto min-h-[160px]">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <p className="text-xs text-primary-foreground/80">My Points</p>
                     <p 
                        className="text-3xl font-bold leading-none mt-1 transition-transform duration-200 ease-in-out" 
                        aria-live="polite"
                        key={points} // Re-trigger animation on change
                     >
                        {formatPointsAsCurrency(points)}
                    </p>
                </div>
                <Button variant="secondary" size="sm" className="w-auto bg-accent text-accent-foreground rounded-full shadow-md transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 focus:ring-0">
                    <Gift className="mr-1.5 h-4 w-4" />
                    Redeem
                </Button>
            </div>
            <div className="flex justify-center">
                 <Button variant="ghost" size="sm" className="w-auto rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 focus:ring-0">
                    <History className="mr-1.5 h-4 w-4" />
                    History
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </header>
  );
}
