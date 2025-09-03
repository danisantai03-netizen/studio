
"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecyclingTip } from "@/ai/flows/recycling-tips";


export function RecyclingTip() {
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['recyclingTip'],
    queryFn: () => getRecyclingTip({}),
    staleTime: Infinity, // Keep the tip until manually refreshed
    refetchOnWindowFocus: false,
  });

  const handleRefresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['recyclingTip'] });
  }, [queryClient]);
  
  const tip = data?.tip;
  const isActuallyLoading = isLoading || isFetching;

  return (
    <section aria-labelledby="recycling-tip-heading">
      <div className="flex items-center justify-between mb-2">
        <h2 id="recycling-tip-heading" className="text-lg font-bold">Daily Eco Tips</h2>
        <Button variant="ghost" onClick={handleRefresh} disabled={isActuallyLoading} className="text-secondary h-auto p-0 text-xs">
          <RefreshCw className={`mr-1 h-3 w-3 ${isActuallyLoading ? "animate-spin" : ""}`} />
          New Tip
        </Button>
      </div>
        {isActuallyLoading ? (
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
