"use client";

import { useState, useEffect, useTransition } from "react";
import { getRecyclingTip, type RecyclingTipOutput } from "@/ai/flows/recycling-tips";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
      <Card className="border-primary/50 shadow-sm">
        <CardHeader className="py-4">
          <CardTitle id="recycling-tip-heading" className="flex items-center gap-2 text-primary text-base">
            <Lightbulb className="w-5 h-5"/>
            Recycling Tip
          </CardTitle>
        </CardHeader>
        <CardContent className="py-0">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <p className="text-foreground text-sm">{tip?.tip}</p>
          )}
        </CardContent>
        <CardFooter className="py-3">
          <Button variant="ghost" onClick={fetchTip} disabled={isPending} className="text-primary hover:text-primary hover:bg-primary/10 active:opacity-70 focus:ring-0 text-sm h-auto p-1">
            <RefreshCw className={`mr-2 h-4 w-4 ${isPending ? "animate-spin" : ""}`} />
            Get Another Tip
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
