
"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const staticTips = [
  "Rinse containers before recycling to avoid contamination and pests.",
  "Flatten cardboard boxes to save space in your recycling bin and at the facility.",
  "Check local recycling guidelines; not all plastics are recyclable everywhere.",
  "Keep plastic bags out of recycling bins; they jam machinery. Return them to a grocery store.",
  "Compost food scraps to reduce landfill waste and create nutrient-rich soil.",
  "Recycle old electronics at designated e-waste centers to recover valuable materials safely.",
  "Remove lids from plastic bottles before recycling; they are often made of a different type of plastic.",
  "Avoid recycling items smaller than a credit card, as they can fall through sorting machinery.",
];

export function RecyclingTip() {
  const [tip, setTip] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const getNewTip = useCallback(() => {
    setIsLoading(true);
    const randomIndex = Math.floor(Math.random() * staticTips.length);
    const newTip = staticTips[randomIndex];
    // Simulate a brief loading period
    setTimeout(() => {
        setTip(newTip);
        setIsLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    getNewTip();
  }, [getNewTip]);

  const handleRefresh = () => {
    getNewTip();
  };

  return (
    <section aria-labelledby="recycling-tip-heading">
      <div className="flex items-center justify-between mb-2">
        <h2 id="recycling-tip-heading" className="text-lg font-bold">Daily Eco Tips</h2>
        <Button variant="ghost" onClick={handleRefresh} disabled={isLoading} className="text-secondary h-auto p-0 text-xs">
          <RefreshCw className={`mr-1 h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
          New Tip
        </Button>
      </div>
        {isLoading ? (
            <Card className="bg-secondary/10 text-secondary-foreground shadow-sm rounded-xl w-full border-secondary/20">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-start gap-3">
                  <Skeleton className="w-8 h-8 rounded-full bg-secondary/20" />
                  <div className="space-y-2 flex-1 pt-1">
                    <Skeleton className="h-4 w-full bg-secondary/20" />
                    <Skeleton className="h-4 w-3/4 bg-secondary/20" />
                  </div>
                </div>
              </CardContent>
            </Card>
        ) : (
          tip && (
            <Card className="bg-secondary/10 shadow-sm rounded-xl w-full border-secondary/20">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-secondary/20 p-1.5 rounded-full mt-0.5">
                    <Lightbulb className="w-5 h-5 text-secondary"/>
                  </div>
                  <p className="text-sm whitespace-normal flex-1 text-secondary-dark font-medium">{tip}</p>
                </div>
              </CardContent>
            </Card>
          )
        )}
    </section>
  );
}
