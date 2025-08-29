"use client";

import { useState, useEffect, useTransition } from "react";
import { getRecyclingTip, type RecyclingTipOutput } from "@/ai/flows/recycling-tips";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

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
      <div className="flex items-center justify-between mb-2 px-4">
        <h2 id="recycling-tip-heading" className="text-xl font-bold">Daily Eco Tips</h2>
        <Button variant="ghost" onClick={fetchTip} disabled={isPending} className="text-primary h-auto p-0 text-sm">
          <RefreshCw className={`mr-1 h-3 w-3 ${isPending ? "animate-spin" : ""}`} />
          New Tip
        </Button>
      </div>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-4 px-4">
            {isLoading ? (
              [...Array(2)].map((_, i) => (
                <Card key={i} className="bg-primary/90 text-primary-foreground shadow-md rounded-2xl w-80">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Skeleton className="w-8 h-8 rounded-full bg-white/30" />
                      <div className="space-y-2 flex-1 pt-1">
                        <Skeleton className="h-4 w-full bg-white/30" />
                        <Skeleton className="h-4 w-3/4 bg-white/30" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              [tip, { tip: "Did you know? You can recycle old sneakers at many specialty stores." }, { tip: "Composting food scraps reduces methane emissions from landfills." }].map((t, i) => (
                <Card key={i} className="bg-primary/90 text-primary-foreground shadow-md rounded-2xl w-80">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-white/20 p-1.5 rounded-full mt-0.5">
                        <Lightbulb className="w-4 h-4"/>
                      </div>
                      <p className="text-sm whitespace-normal flex-1">{t?.tip}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </section>
  );
}
