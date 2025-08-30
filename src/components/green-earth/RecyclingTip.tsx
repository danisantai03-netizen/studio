
"use client";

import { useState, useEffect, useTransition } from "react";
import { getRecyclingTip, type RecyclingTipOutput } from "@/ai/flows/recycling-tips";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export function RecyclingTip() {
  const [tip, setTip] = useState<RecyclingTipOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const fetchTip = async () => {
    startTransition(async () => {
      try {
        const newTip = await getRecyclingTip({});
        setTip(newTip);
      } catch (error) {
        console.error("Failed to fetch recycling tip:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load a new tip. Please try again later.",
        });
      }
    });
  };

  useEffect(() => {
    const loadInitialTip = async () => {
      setIsLoading(true);
      await fetchTip();
      setIsLoading(false);
    };
    loadInitialTip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section aria-labelledby="recycling-tip-heading">
      <div className="flex items-center justify-between mb-2">
        <h2 id="recycling-tip-heading" className="text-lg font-bold">Daily Eco Tips</h2>
        <Button variant="ghost" onClick={fetchTip} disabled={isPending} className="text-secondary h-auto p-0 text-xs">
          <RefreshCw className={`mr-1 h-3 w-3 ${isPending ? "animate-spin" : ""}`} />
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
                  <p className="text-sm whitespace-normal flex-1 text-secondary-dark font-medium">{tip.tip}</p>
                </div>
              </CardContent>
            </Card>
          )
        )}
    </section>
  );
}
